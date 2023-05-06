#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float radius;
};

struct main0_out
{
    float4 o_FragColor [[color(0)]];
};

struct main0_in
{
    float2 screenUV [[user(locn0)]];
    float2 orgUV [[user(locn1)]];
    float2 modelScale [[user(locn2)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> u_FBOTexture [[texture(0)]], sampler u_FBOTextureSmplr [[sampler(0)]])
{
    main0_out out = {};
    float4 _19 = u_FBOTexture.sample(u_FBOTextureSmplr, in.screenUV);
    float2 _28 = fast::normalize(in.orgUV) * buffer.radius;
    float _39 = _28.x * in.modelScale.x;
    float _45 = _28.y * in.modelScale.y;
    float2 _46 = float2(_39, _45);
    float _52 = in.orgUV.x * in.modelScale.x;
    float _57 = in.orgUV.y * in.modelScale.y;
    float2 _58 = float2(_52, _57);
    float _139;
    if (_45 != 0.0)
    {
        _139 = length(cross(fast::normalize(float3(1.0, (((-1.0) * pow(in.modelScale.y, 2.0)) * _39) / (pow(in.modelScale.x, 2.0) * _45), 0.0)), fast::normalize(float3(_52, _57, 0.0))));
    }
    else
    {
        _139 = 1.0;
    }
    float4 _141;
    if ((length(_46) - length(_58)) >= 0.0)
    {
        _141 = select(_19, float4(0.2980000078678131103515625, 0.5759999752044677734375, 0.913999974727630615234375, 0.5), bool4((length(_58 - _46) * _139) <= 0.20000000298023223876953125));
    }
    else
    {
        _141 = _19;
    }
    out.o_FragColor = _141;
    return out;
}

