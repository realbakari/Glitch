#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float _Intensity;
};

struct main0_out
{
    float4 o_FragColor [[color(0)]];
};

struct main0_in
{
    float2 uv0 [[user(locn0)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> u_FBOTexture [[texture(0)]], texture2d<float> _BaseTexture [[texture(1)]], sampler u_FBOTextureSmplr [[sampler(0)]], sampler _BaseTextureSmplr [[sampler(1)]])
{
    main0_out out = {};
    float4 _19 = u_FBOTexture.sample(u_FBOTextureSmplr, in.uv0);
    float _31 = floor(_19.z * 63.0);
    float _34 = floor(_31 * 0.125);
    out.o_FragColor = mix(_19, _BaseTexture.sample(_BaseTextureSmplr, float2(fma(0.123046875, _19.x, fma(fma(-_34, 8.0, _31), 0.125, 0.0009765625)), fma(0.123046875, _19.y, fma(_34, 0.125, 0.0009765625)))), float4(buffer._Intensity));
    return out;
}

