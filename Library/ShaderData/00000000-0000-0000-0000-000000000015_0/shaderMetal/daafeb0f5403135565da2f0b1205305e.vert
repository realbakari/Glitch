#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float4 _MeshRescale;
    float2 _TextureRescale;
    float4x4 u_MVP;
    float4x4 u_TransposeInvModel;
};

struct main0_out
{
    float2 g_vary_uv0 [[user(locn0)]];
    float4 v_sampling_pos [[user(locn1)]];
    float4 v_background_pos [[user(locn2)]];
    float3 v_worldPos [[user(locn3)]];
    float3 v_Normal [[user(locn4)]];
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 attPosition [[attribute(0)]];
    float2 attTexcoord0 [[attribute(1)]];
    float3 attNormal [[attribute(2)]];
};

vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
{
    main0_out out = {};
    float4 _45 = float4x4(float4(buffer._MeshRescale.x, 0.0, 0.0, 0.0), float4(0.0, buffer._MeshRescale.y, 0.0, 0.0), float4(0.0, 0.0, buffer._MeshRescale.z, 0.0), float4(0.0, 0.0, 0.0, 1.0)) * float4(in.attPosition, 1.0);
    out.g_vary_uv0 = fma(in.attTexcoord0 - float2(0.5), buffer._TextureRescale, float2(0.5));
    float4 _75 = buffer.u_MVP * _45;
    out.gl_Position = _75;
    out.v_worldPos = _45.xyz;
    out.v_Normal = float3x3(buffer.u_TransposeInvModel[0].xyz, buffer.u_TransposeInvModel[1].xyz, buffer.u_TransposeInvModel[2].xyz) * in.attNormal;
    out.v_sampling_pos = _75;
    out.v_background_pos = _75;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}

