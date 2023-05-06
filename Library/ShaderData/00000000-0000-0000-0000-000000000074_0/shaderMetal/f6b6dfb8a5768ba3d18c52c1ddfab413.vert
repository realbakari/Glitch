#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float4x4 u_MVP;
    float2 signFlag;
    float2 intensity;
    float radius;
    float4x4 u_Model;
};

struct main0_out
{
    float2 screenUV [[user(locn0)]];
    float2 orgUV [[user(locn1)]];
    float2 modelScale [[user(locn2)]];
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 attPosition [[attribute(0)]];
};

vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
{
    main0_out out = {};
    out.gl_Position = buffer.u_MVP * float4(in.attPosition, 1.0);
    float _29 = length(in.attPosition.xy);
    float2 _38 = sign(buffer.signFlag * in.attPosition.xy);
    float2 _51 = float2(1.0 - length(sign(buffer.signFlag))) + ((_38 * (_38 + float2(1.0))) * 0.5);
    float2 _238;
    if (buffer.intensity.x > 0.0)
    {
        float2 _219 = in.attPosition.xy;
        _219.x = in.attPosition.x * fma(fma(buffer.intensity.x, smoothstep(0.0, 1.0, pow(_29 / buffer.radius, 2.0)), 1.0 - buffer.intensity.x) - 1.0, _51.x, 1.0);
        _238 = _219;
    }
    else
    {
        float2 _223 = in.attPosition.xy;
        _223.x = in.attPosition.x / fma(fma(-buffer.intensity.x, smoothstep(-0.300000011920928955078125, 1.0, _29 / buffer.radius), 1.0 + buffer.intensity.x) - 1.0, _51.x, 1.0);
        _238 = _223;
    }
    float2 _239;
    if (buffer.intensity.y > 0.0)
    {
        float2 _227 = _238;
        _227.y = _238.y * fma(fma(buffer.intensity.y, smoothstep(0.0, 1.0, pow(_29 / buffer.radius, 2.0)), 1.0 - buffer.intensity.y) - 1.0, _51.y, 1.0);
        _239 = _227;
    }
    else
    {
        float2 _231 = _238;
        _231.y = _238.y / fma(fma(-buffer.intensity.y, smoothstep(-0.300000011920928955078125, 1.0, _29 / buffer.radius), 1.0 + buffer.intensity.y) - 1.0, _51.y, 1.0);
        _239 = _231;
    }
    float4 _175 = buffer.u_MVP * float4(_239, 0.0, 1.0);
    float _182 = _175.w;
    out.screenUV = (float2(_175.x / _182, _175.y / _182) * 0.5) + float2(0.5);
    out.modelScale = float2(length(buffer.u_Model[0].xyz), length(buffer.u_Model[1].xyz));
    out.orgUV = in.attPosition.xy;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}

