#pragma clang diagnostic ignored "-Wmissing-prototypes"
#pragma clang diagnostic ignored "-Wmissing-braces"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

template<typename T, size_t Num>
struct spvUnsafeArray
{
    T elements[Num ? Num : 1];
    
    thread T& operator [] (size_t pos) thread
    {
        return elements[pos];
    }
    constexpr const thread T& operator [] (size_t pos) const thread
    {
        return elements[pos];
    }
    
    device T& operator [] (size_t pos) device
    {
        return elements[pos];
    }
    constexpr const device T& operator [] (size_t pos) const device
    {
        return elements[pos];
    }
    
    constexpr const constant T& operator [] (size_t pos) const constant
    {
        return elements[pos];
    }
    
    threadgroup T& operator [] (size_t pos) threadgroup
    {
        return elements[pos];
    }
    constexpr const threadgroup T& operator [] (size_t pos) const threadgroup
    {
        return elements[pos];
    }
};

struct buffer_t
{
    spvUnsafeArray<float4x4, 50> u_Palatte;
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
    float4 attBoneIds [[attribute(4)]];
    float4 attWeights [[attribute(5)]];
};

vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
{
    main0_out out = {};
    float4x4 _40 = buffer.u_Palatte[int(in.attBoneIds.x)] * in.attWeights.x;
    float4x4 _49 = buffer.u_Palatte[int(in.attBoneIds.y)] * in.attWeights.y;
    float4x4 _71 = buffer.u_Palatte[int(in.attBoneIds.z)] * in.attWeights.z;
    float4x4 _93 = buffer.u_Palatte[int(in.attBoneIds.w)] * in.attWeights.w;
    float4x4 _106 = float4x4(((_40[0] + _49[0]) + _71[0]) + _93[0], ((_40[1] + _49[1]) + _71[1]) + _93[1], ((_40[2] + _49[2]) + _71[2]) + _93[2], ((_40[3] + _49[3]) + _71[3]) + _93[3]);
    float4 _115 = float4(in.attPosition, 1.0);
    float4 _116 = _106 * _115;
    float4 _126 = _106 * float4(in.attNormal, 0.0);
    out.v_posWS = (buffer.u_Model * float4(_116.xyz, 1.0)).xyz;
    out.v_nDirWS = fast::normalize((buffer.u_TransposeInvModel * float4(_126.xyz, 0.0)).xyz);
    float4 _157 = _106 * float4(in.attTangent, 0.0);
    float4 _166 = _106 * float4(fast::normalize(cross(in.attNormal, in.attTangent)), 0.0);
    out.v_tDirWS = fast::normalize((buffer.u_Model * float4(_157.xyz, 0.0)).xyz);
    out.v_bDirWS = fast::normalize((buffer.u_Model * float4(_166.xyz, 0.0)).xyz);
    out.gl_Position = (buffer.u_MVP * _106) * _115;
    out.v_uv0 = float2(in.attTexcoord0.x, 1.0 - in.attTexcoord0.y);
    out.v_gl_pos = out.gl_Position;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}

