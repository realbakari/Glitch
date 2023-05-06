#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float4x4 u_Model;
    float4x4 u_TransposeInvModel;
    float4x4 u_MVP;
};

struct main0_out
{
    float3 v_posWS [[user(locn0)]];
    float3 v_nDirWS [[user(locn1)]];
    float2 v_uv0 [[user(locn2)]];
    float4 v_gl_pos [[user(locn3)]];
    float3 v_tDirWS [[user(locn4)]];
    float3 v_bDirWS [[user(locn5)]];
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 attPosition [[attribute(0)]];
    float3 attNormal [[attribute(1)]];
    float2 attTexcoord0 [[attribute(2)]];
    float3 attTangent [[attribute(3)]];
};

vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
{
    main0_out out = {};
    float4 _30 = float4(in.attPosition, 1.0);
    out.v_posWS = (buffer.u_Model * _30).xyz;
    out.v_nDirWS = fast::normalize((buffer.u_TransposeInvModel * float4(in.attNormal, 0.0)).xyz);
    out.v_tDirWS = fast::normalize((buffer.u_Model * float4(in.attTangent, 0.0)).xyz);
    out.v_bDirWS = fast::normalize((buffer.u_Model * float4(fast::normalize(cross(in.attNormal, in.attTangent)), 0.0)).xyz);
    out.gl_Position = buffer.u_MVP * _30;
    out.v_uv0 = float2(in.attTexcoord0.x, 1.0 - in.attTexcoord0.y);
    out.v_gl_pos = out.gl_Position;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}

