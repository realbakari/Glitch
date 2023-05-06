#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float4 _BaseColor;
    float _Opacity;
};

struct main0_out
{
    float4 glResult [[color(0)]];
};

struct main0_in
{
    float2 g_vary_uv0 [[user(locn0)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> _BaseTexture [[texture(0)]], sampler _BaseTextureSmplr [[sampler(0)]])
{
    main0_out out = {};
    float2 _76 = in.g_vary_uv0;
    _76.y = 1.0 - in.g_vary_uv0.y;
    float4 _49 = _BaseTexture.sample(_BaseTextureSmplr, _76) * buffer._BaseColor;
    float _55 = _49.w * buffer._Opacity;
    float4 _79 = _49;
    _79.w = _55;
    if (_55 == 0.0)
    {
        discard_fragment();
    }
    out.glResult = _79;
    return out;
}

