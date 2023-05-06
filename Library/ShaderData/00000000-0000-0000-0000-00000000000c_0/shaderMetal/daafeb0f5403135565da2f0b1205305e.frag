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
    float4 u_WorldSpaceCameraPos;
    spvUnsafeArray<float, 3> u_DirLightsEnabled;
    float u_DirLightNum;
    spvUnsafeArray<float4, 3> u_DirLightsDirection;
    spvUnsafeArray<float4, 3> u_DirLightsColor;
    spvUnsafeArray<float, 3> u_DirLightsIntensity;
    spvUnsafeArray<float, 2> u_PointLightsEnabled;
    float u_PointLightNum;
    spvUnsafeArray<float4, 2> u_PointLightsPosition;
    spvUnsafeArray<float4, 2> u_PointLightsColor;
    spvUnsafeArray<float, 2> u_PointLightsIntensity;
    spvUnsafeArray<float, 2> u_PointLightsAttenRangeInv;
    spvUnsafeArray<float, 2> u_SpotLightsEnabled;
    float u_SpotLightNum;
    spvUnsafeArray<float4, 2> u_SpotLightsPosition;
    spvUnsafeArray<float4, 2> u_SpotLightsColor;
    spvUnsafeArray<float, 2> u_SpotLightsIntensity;
    spvUnsafeArray<float, 2> u_SpotLightsAttenRangeInv;
    spvUnsafeArray<float4, 2> u_SpotLightsDirection;
    spvUnsafeArray<float, 2> u_SpotLightsOuterAngleCos;
    spvUnsafeArray<float, 2> u_SpotLightsInnerAngleCos;
    float _AmbientIntensity;
    float _AmbientRotation;
    float4 _AlbedoColor;
    float _Metallic;
    float _Roughness;
};

constant float _6656 = {};

struct main0_out
{
    float4 glResult [[color(0)]];
};

struct main0_in
{
    float3 v_posWS [[user(locn0)]];
    float3 v_nDirWS [[user(locn1)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> _AmbientTexture [[texture(0)]], sampler _AmbientTextureSmplr [[sampler(0)]])
{
    main0_out out = {};
    float3 _2201 = float3(pow(buffer._AlbedoColor.x, 2.2000000476837158203125), pow(buffer._AlbedoColor.y, 2.2000000476837158203125), pow(buffer._AlbedoColor.z, 2.2000000476837158203125));
    float _2437 = fast::clamp(buffer._Metallic, 0.0, 1.0);
    float _2336 = fast::clamp(buffer._Roughness, 0.07999999821186065673828125, 1.0);
    float _2442 = _2336 * _2336;
    float _2447 = _2442 * _2442;
    float3 _2360 = _2201 * (0.959999978542327880859375 * (1.0 - _2437));
    float3 _2367 = mix(float3(0.039999999105930328369140625), _2201, float3(_2437));
    float3 _2402 = fast::normalize(buffer.u_WorldSpaceCameraPos.xyz - in.v_posWS);
    float3 _6489;
    if (dot(_2402, in.v_nDirWS) < 0.0)
    {
        _6489 = reflect(_2402, in.v_nDirWS);
    }
    else
    {
        _6489 = _2402;
    }
    float3 _2428 = fast::normalize(reflect(-_6489, in.v_nDirWS));
    float _2470 = fast::max(0.0, dot(in.v_nDirWS, _6489));
    float _2493 = fast::min(1.0 + dot(_2428, in.v_nDirWS), 1.0);
    float _2499 = fast::clamp(pow(_2470 + 1.0, exp2(fma(-16.0, _2336, -1.0))), 0.0, 1.0) * (_2493 * _2493);
    float _2563 = buffer.u_DirLightsEnabled[0] * step(0.5, buffer.u_DirLightNum);
    float3 _2570 = fast::normalize(-buffer.u_DirLightsDirection[0].xyz);
    float _2582 = buffer.u_DirLightsIntensity[0] * _2563;
    float _2597 = buffer.u_DirLightsEnabled[1] * step(1.5, buffer.u_DirLightNum);
    float3 _2604 = fast::normalize(-buffer.u_DirLightsDirection[1].xyz);
    float _2616 = buffer.u_DirLightsIntensity[1] * _2597;
    float _2631 = buffer.u_DirLightsEnabled[2] * step(2.5, buffer.u_DirLightNum);
    float3 _2638 = fast::normalize(-buffer.u_DirLightsDirection[2].xyz);
    float _2650 = buffer.u_DirLightsIntensity[2] * _2631;
    float _2672 = buffer.u_PointLightsEnabled[0] * step(0.5, buffer.u_PointLightNum);
    float3 _2680 = buffer.u_PointLightsPosition[0].xyz - in.v_posWS;
    float _2682 = length(_2680);
    float3 _2686 = _2680 / float3(_2682);
    float _2698 = buffer.u_PointLightsIntensity[0] * _2672;
    float _2704 = _2682 * buffer.u_PointLightsAttenRangeInv[0];
    float _2726 = _2704 * _2704;
    float _2733 = fast::clamp(fma(-_2726, _2726, 1.0), 0.0, 1.0);
    float3 _2718 = float3(((_2733 * _2733) * fma(_2704, _2704, 1.0)) * 0.25);
    float _2762 = buffer.u_PointLightsEnabled[1] * step(1.5, buffer.u_PointLightNum);
    float3 _2770 = buffer.u_PointLightsPosition[1].xyz - in.v_posWS;
    float _2772 = length(_2770);
    float3 _2776 = _2770 / float3(_2772);
    float _2788 = buffer.u_PointLightsIntensity[1] * _2762;
    float _2794 = _2772 * buffer.u_PointLightsAttenRangeInv[1];
    float _2816 = _2794 * _2794;
    float _2823 = fast::clamp(fma(-_2816, _2816, 1.0), 0.0, 1.0);
    float3 _2808 = float3(((_2823 * _2823) * fma(_2794, _2794, 1.0)) * 0.25);
    float _2854 = buffer.u_SpotLightsEnabled[0] * step(0.5, buffer.u_SpotLightNum);
    float3 _2862 = buffer.u_SpotLightsPosition[0].xyz - in.v_posWS;
    float _2864 = length(_2862);
    float3 _2868 = _2862 / float3(_2864);
    float _2880 = buffer.u_SpotLightsIntensity[0] * _2854;
    float _2886 = _2864 * buffer.u_SpotLightsAttenRangeInv[0];
    float _2929 = _2886 * _2886;
    float _2936 = fast::clamp(fma(-_2929, _2929, 1.0), 0.0, 1.0);
    float3 _2921 = float3((((_2936 * _2936) * fma(_2886, _2886, 1.0)) * 0.25) * smoothstep(buffer.u_SpotLightsOuterAngleCos[0], buffer.u_SpotLightsInnerAngleCos[0], fast::max(0.0, dot(_2868, fast::normalize(-buffer.u_SpotLightsDirection[0].xyz)))));
    float _2967 = buffer.u_SpotLightsEnabled[1] * step(1.5, buffer.u_SpotLightNum);
    float3 _2975 = buffer.u_SpotLightsPosition[1].xyz - in.v_posWS;
    float _2977 = length(_2975);
    float3 _2981 = _2975 / float3(_2977);
    float _2993 = buffer.u_SpotLightsIntensity[1] * _2967;
    float _2999 = _2977 * buffer.u_SpotLightsAttenRangeInv[1];
    float _3042 = _2999 * _2999;
    float _3049 = fast::clamp(fma(-_3042, _3042, 1.0), 0.0, 1.0);
    float3 _3034 = float3((((_3049 * _3049) * fma(_2999, _2999, 1.0)) * 0.25) * smoothstep(buffer.u_SpotLightsOuterAngleCos[1], buffer.u_SpotLightsInnerAngleCos[1], fast::max(0.0, dot(_2981, fast::normalize(-buffer.u_SpotLightsDirection[1].xyz)))));
    float3 _3321 = fast::normalize(in.v_nDirWS);
    float _3324 = -_3321.z;
    float _3326 = _3321.x;
    float _3333 = acos(_3321.y);
    float _3339 = fma(fma((_3326 < 0.0) ? (-1.0) : 1.0, acos(fast::clamp(_3324 / length(float2(_3326, _3324)), -1.0, 1.0)), -1.57079637050628662109375), 0.15915493667125701904296875, buffer._AmbientRotation);
    float _3348 = fract((_3339 + floor(_3339)) + 1.0);
    float2 _6248 = float2(_6656, _3333 * 0.3183098733425140380859375);
    _6248.x = _3348;
    float _3376 = floor(7.0);
    float2 _6496;
    float2 _6504;
    if (abs(_3376) < 0.001000000047497451305389404296875)
    {
        _6504 = float2(fma(_3348, 0.99609375, 0.001953125) * 0.5, fma(fma(_3333, 0.315823078155517578125, 0.00390625), 0.25, 0.5));
        _6496 = float2(fma(_3348, 0.998046875, 0.0009765625), fma(_3333, 0.3170664608478546142578125, 0.001953125) * 0.5);
    }
    else
    {
        float2 _6497;
        float2 _6505;
        if (abs(_3376 - 1.0) < 0.001000000047497451305389404296875)
        {
            float _3429 = fma(_3348, 0.99609375, 0.001953125);
            float _3439 = fma(fma(_3333, 0.315823078155517578125, 0.00390625), 0.25, 0.5);
            _6505 = float2(fma(_3429, 0.5, 0.5), _3439);
            _6497 = float2(_3429 * 0.5, _3439);
        }
        else
        {
            float2 _6498;
            float2 _6506;
            if (abs(_3376 - 2.0) < 0.001000000047497451305389404296875)
            {
                float _3467 = fma(_3348, 0.99609375, 0.001953125);
                float _3475 = fma(_3333, 0.315823078155517578125, 0.00390625);
                _6506 = float2(_3467 * 0.5, fma(_3475, 0.25, 0.75));
                _6498 = float2(fma(_3467, 0.5, 0.5), fma(_3475, 0.25, 0.5));
            }
            else
            {
                float2 _6499;
                float2 _6507;
                if (abs(_3376 - 3.0) < 0.001000000047497451305389404296875)
                {
                    _6507 = float2(fma(fma(_3348, 0.9921875, 0.00390625), 0.25, 0.5), fma(fma(_3333, 0.3133362829685211181640625, 0.0078125), 0.125, 0.75));
                    _6499 = float2(fma(_3348, 0.99609375, 0.001953125) * 0.5, fma(fma(_3333, 0.315823078155517578125, 0.00390625), 0.25, 0.75));
                }
                else
                {
                    float2 _6500;
                    float2 _6508;
                    if (abs(_3376 - 4.0) < 0.001000000047497451305389404296875)
                    {
                        float _3543 = fma(_3348, 0.9921875, 0.00390625);
                        float _3553 = fma(fma(_3333, 0.3133362829685211181640625, 0.0078125), 0.125, 0.75);
                        _6508 = float2(fma(_3543, 0.25, 0.75), _3553);
                        _6500 = float2(fma(_3543, 0.25, 0.5), _3553);
                    }
                    else
                    {
                        float2 _6501;
                        float2 _6509;
                        if (abs(_3376 - 5.0) < 0.001000000047497451305389404296875)
                        {
                            float _3581 = fma(_3348, 0.9921875, 0.00390625);
                            float _3589 = fma(_3333, 0.3133362829685211181640625, 0.0078125);
                            _6509 = float2(fma(_3581, 0.25, 0.5), fma(_3589, 0.125, 0.875));
                            _6501 = float2(fma(_3581, 0.25, 0.75), fma(_3589, 0.125, 0.75));
                        }
                        else
                        {
                            float2 _6502;
                            float2 _6510;
                            if (abs(_3376 - 6.0) < 0.001000000047497451305389404296875)
                            {
                                float _3619 = fma(_3348, 0.9921875, 0.00390625);
                                float _3629 = fma(fma(_3333, 0.3133362829685211181640625, 0.0078125), 0.125, 0.875);
                                _6510 = float2(fma(_3619, 0.25, 0.75), _3629);
                                _6502 = float2(fma(_3619, 0.25, 0.5), _3629);
                            }
                            else
                            {
                                float2 _6511;
                                if (abs(_3376 - 7.0) < 0.001000000047497451305389404296875)
                                {
                                    _6511 = float2(fma(fma(_3348, 0.9921875, 0.00390625), 0.25, 0.75), fma(fma(_3333, 0.3133362829685211181640625, 0.0078125), 0.125, 0.875));
                                }
                                else
                                {
                                    _6511 = _6248;
                                }
                                _6510 = _6511;
                                _6502 = _6511;
                            }
                            _6509 = _6510;
                            _6501 = _6502;
                        }
                        _6508 = _6509;
                        _6500 = _6501;
                    }
                    _6507 = _6508;
                    _6499 = _6500;
                }
                _6506 = _6507;
                _6498 = _6499;
            }
            _6505 = _6506;
            _6497 = _6498;
        }
        _6504 = _6505;
        _6496 = _6497;
    }
    float4 _3695 = _AmbientTexture.sample(_AmbientTextureSmplr, _6496);
    float4 _3698 = _AmbientTexture.sample(_AmbientTextureSmplr, _6504);
    float4 _3701 = mix(_3695, _3698, float4(7.0 - _3376));
    float3 _3113 = ((((_3701.xyz / float3(_3701.w)) * _2360) * fast::max(float3(1.0), ((((((_2360 * 2.040400028228759765625) - float3(0.3323999941349029541015625)) * 1.0) + ((_2360 * (-4.79510021209716796875)) + float3(0.6417000293731689453125))) * 1.0) + ((_2360 * 2.755199909210205078125) + float3(0.69029998779296875))) * 1.0)) * buffer._AmbientIntensity) * 1.0;
    float _3764 = _2336 - 0.07999999821186065673828125;
    float3 _3804 = fast::normalize(mix(_2428, in.v_nDirWS, float3(_2336 * _2442)));
    float _3807 = -_3804.z;
    float _3809 = _3804.x;
    float _3816 = acos(_3804.y);
    float _3822 = fma(fma((_3809 < 0.0) ? (-1.0) : 1.0, acos(fast::clamp(_3807 / length(float2(_3809, _3807)), -1.0, 1.0)), -1.57079637050628662109375), 0.15915493667125701904296875, buffer._AmbientRotation);
    float _3831 = fract((_3822 + floor(_3822)) + 1.0);
    float2 _6363 = float2(_6656, _3816 * 0.3183098733425140380859375);
    _6363.x = _3831;
    float _3859 = floor(_3764 * 7.0);
    float2 _6529;
    float2 _6537;
    if (abs(_3859) < 0.001000000047497451305389404296875)
    {
        _6537 = float2(fma(_3831, 0.99609375, 0.001953125) * 0.5, fma(fma(_3816, 0.315823078155517578125, 0.00390625), 0.25, 0.5));
        _6529 = float2(fma(_3831, 0.998046875, 0.0009765625), fma(_3816, 0.3170664608478546142578125, 0.001953125) * 0.5);
    }
    else
    {
        float2 _6530;
        float2 _6538;
        if (abs(_3859 - 1.0) < 0.001000000047497451305389404296875)
        {
            float _3912 = fma(_3831, 0.99609375, 0.001953125);
            float _3922 = fma(fma(_3816, 0.315823078155517578125, 0.00390625), 0.25, 0.5);
            _6538 = float2(fma(_3912, 0.5, 0.5), _3922);
            _6530 = float2(_3912 * 0.5, _3922);
        }
        else
        {
            float2 _6531;
            float2 _6539;
            if (abs(_3859 - 2.0) < 0.001000000047497451305389404296875)
            {
                float _3950 = fma(_3831, 0.99609375, 0.001953125);
                float _3958 = fma(_3816, 0.315823078155517578125, 0.00390625);
                _6539 = float2(_3950 * 0.5, fma(_3958, 0.25, 0.75));
                _6531 = float2(fma(_3950, 0.5, 0.5), fma(_3958, 0.25, 0.5));
            }
            else
            {
                float2 _6532;
                float2 _6540;
                if (abs(_3859 - 3.0) < 0.001000000047497451305389404296875)
                {
                    _6540 = float2(fma(fma(_3831, 0.9921875, 0.00390625), 0.25, 0.5), fma(fma(_3816, 0.3133362829685211181640625, 0.0078125), 0.125, 0.75));
                    _6532 = float2(fma(_3831, 0.99609375, 0.001953125) * 0.5, fma(fma(_3816, 0.315823078155517578125, 0.00390625), 0.25, 0.75));
                }
                else
                {
                    float2 _6533;
                    float2 _6541;
                    if (abs(_3859 - 4.0) < 0.001000000047497451305389404296875)
                    {
                        float _4026 = fma(_3831, 0.9921875, 0.00390625);
                        float _4036 = fma(fma(_3816, 0.3133362829685211181640625, 0.0078125), 0.125, 0.75);
                        _6541 = float2(fma(_4026, 0.25, 0.75), _4036);
                        _6533 = float2(fma(_4026, 0.25, 0.5), _4036);
                    }
                    else
                    {
                        float2 _6534;
                        float2 _6542;
                        if (abs(_3859 - 5.0) < 0.001000000047497451305389404296875)
                        {
                            float _4064 = fma(_3831, 0.9921875, 0.00390625);
                            float _4072 = fma(_3816, 0.3133362829685211181640625, 0.0078125);
                            _6542 = float2(fma(_4064, 0.25, 0.5), fma(_4072, 0.125, 0.875));
                            _6534 = float2(fma(_4064, 0.25, 0.75), fma(_4072, 0.125, 0.75));
                        }
                        else
                        {
                            float2 _6535;
                            float2 _6543;
                            if (abs(_3859 - 6.0) < 0.001000000047497451305389404296875)
                            {
                                float _4102 = fma(_3831, 0.9921875, 0.00390625);
                                float _4112 = fma(fma(_3816, 0.3133362829685211181640625, 0.0078125), 0.125, 0.875);
                                _6543 = float2(fma(_4102, 0.25, 0.75), _4112);
                                _6535 = float2(fma(_4102, 0.25, 0.5), _4112);
                            }
                            else
                            {
                                float2 _6544;
                                if (abs(_3859 - 7.0) < 0.001000000047497451305389404296875)
                                {
                                    _6544 = float2(fma(fma(_3831, 0.9921875, 0.00390625), 0.25, 0.75), fma(fma(_3816, 0.3133362829685211181640625, 0.0078125), 0.125, 0.875));
                                }
                                else
                                {
                                    _6544 = _6363;
                                }
                                _6543 = _6544;
                                _6535 = _6544;
                            }
                            _6542 = _6543;
                            _6534 = _6535;
                        }
                        _6541 = _6542;
                        _6533 = _6534;
                    }
                    _6540 = _6541;
                    _6532 = _6533;
                }
                _6539 = _6540;
                _6531 = _6532;
            }
            _6538 = _6539;
            _6530 = _6531;
        }
        _6537 = _6538;
        _6529 = _6530;
    }
    float4 _4184 = mix(_AmbientTexture.sample(_AmbientTextureSmplr, _6529), _AmbientTexture.sample(_AmbientTextureSmplr, _6537), float4(fma(_3764, 7.0, -_3859)));
    float4 _4209 = (float4(-1.0, -0.0274999998509883880615234375, -0.572000026702880859375, 0.02199999988079071044921875) * _2336) + float4(1.0, 0.0425000004470348358154296875, 1.03999996185302734375, -0.039999999105930328369140625);
    float _4211 = _4209.x;
    float2 _4229 = (float2(-1.03999996185302734375, 1.03999996185302734375) * fma(fast::min(_4211 * _4211, exp2((-9.27999973297119140625) * _2470)), _4211, _4209.y)) + _4209.zw;
    float3 _3120 = (((((_2367 * _4229.x) + float3(_4229.y * fast::clamp(50.0 * _2367.y, 0.0, 1.0))) * (_4184.xyz / float3(_4184.w))) * fast::max(float3(_2499), ((((((_2367 * 2.040400028228759765625) - float3(0.3323999941349029541015625)) * _2499) + ((_2367 * (-4.79510021209716796875)) + float3(0.6417000293731689453125))) * _2499) + ((_2367 * 2.755199909210205078125) + float3(0.69029998779296875))) * _2499)) * buffer._AmbientIntensity) * 1.0;
    float3 _6572;
    float3 _6573;
    if (_2563 > 0.5)
    {
        float3 _4302 = fast::normalize(_2570 + _6489);
        float _4308 = fast::max(0.0, dot(in.v_nDirWS, _2570));
        float _4319 = fast::max(0.0, dot(_6489, _4302));
        float _4335 = fma(-_2470, _4308, fma(2.0 * _4319, _4319, -1.0));
        float _6561;
        if (_4335 >= 0.0)
        {
            _6561 = 1.0 / fast::max(_4308, _2470);
        }
        else
        {
            _6561 = 1.0;
        }
        float _4413 = fast::max(0.0, dot(in.v_nDirWS, _4302));
        float _4471 = 1.0 - _4308;
        float _4499 = fma(fma(_4413, _2447, -_4413), _4413, 1.0);
        float _4512 = 1.0 - _4319;
        float _4526 = _4512 * _4512;
        _6573 = _3120 + ((((((((_2367 + ((float3(1.0) - _2367) * ((_4526 * _4526) * _4512))) * (0.5 / (fma(_2442, fma(_2470, _4471, _4308), _2470 * fma(_2442, _4471, _4308)) + 9.9999997473787516355514526367188e-06))) * ((_2447 * 0.31830990314483642578125) / fma(_4499, _4499, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _4308) * buffer.u_DirLightsColor[0].xyz) * _2582) * 1.0);
        _6572 = _3113 + ((((_2360 * buffer.u_DirLightsColor[0].xyz) * _2582) * ((fma(((0.449999988079071044921875 * _2447) / fma(_2442, _2442, 0.0900000035762786865234375)) * _4335, _6561, 1.0 - ((0.5 * _2447) / fma(_2442, _2442, 0.3300000131130218505859375))) * fma(_2336, 0.5, 1.0)) * _4308)) * 1.0);
    }
    else
    {
        _6573 = _3120;
        _6572 = _3113;
    }
    float3 _6574;
    float3 _6575;
    if (_2597 > 0.5)
    {
        float _4541 = fast::max(0.0, dot(in.v_nDirWS, _2604));
        float3 _4577 = fast::normalize(_2604 + _6489);
        float _4582 = fast::max(0.0, dot(in.v_nDirWS, _4577));
        float _4636 = fma(fma(_4582, _2447, -_4582), _4582, 1.0);
        float _4649 = 1.0 - fast::max(0.0, dot(_6489, _4577));
        float _4663 = _4649 * _4649;
        _6575 = _6573 + ((((((((_2367 + ((float3(1.0) - _2367) * ((_4663 * _4663) * _4649))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_4636, _4636, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _4541) * buffer.u_DirLightsColor[1].xyz) * _2616) * 1.0);
        _6574 = _6572 + ((((_2360 * buffer.u_DirLightsColor[1].xyz) * _2616) * _4541) * 1.0);
    }
    else
    {
        _6575 = _6573;
        _6574 = _6572;
    }
    float3 _6576;
    float3 _6577;
    if (_2631 > 0.5)
    {
        float _4678 = fast::max(0.0, dot(in.v_nDirWS, _2638));
        float3 _4714 = fast::normalize(_2638 + _6489);
        float _4719 = fast::max(0.0, dot(in.v_nDirWS, _4714));
        float _4773 = fma(fma(_4719, _2447, -_4719), _4719, 1.0);
        float _4786 = 1.0 - fast::max(0.0, dot(_6489, _4714));
        float _4800 = _4786 * _4786;
        _6577 = _6575 + ((((((((_2367 + ((float3(1.0) - _2367) * ((_4800 * _4800) * _4786))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_4773, _4773, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _4678) * buffer.u_DirLightsColor[2].xyz) * _2650) * 1.0);
        _6576 = _6574 + ((((_2360 * buffer.u_DirLightsColor[2].xyz) * _2650) * _4678) * 1.0);
    }
    else
    {
        _6577 = _6575;
        _6576 = _6574;
    }
    float3 _6578;
    float3 _6579;
    if (_2672 > 0.5)
    {
        float _4815 = fast::max(0.0, dot(in.v_nDirWS, _2686));
        float3 _4851 = fast::normalize(_2686 + _6489);
        float _4856 = fast::max(0.0, dot(in.v_nDirWS, _4851));
        float _4910 = fma(fma(_4856, _2447, -_4856), _4856, 1.0);
        float _4923 = 1.0 - fast::max(0.0, dot(_6489, _4851));
        float _4937 = _4923 * _4923;
        _6579 = _6577 + (((((((((_2367 + ((float3(1.0) - _2367) * ((_4937 * _4937) * _4923))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_4910, _4910, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _4815) * buffer.u_PointLightsColor[0].xyz) * _2698) * _2718) * 1.0);
        _6578 = _6576 + (((((_2360 * buffer.u_PointLightsColor[0].xyz) * _2698) * _2718) * _4815) * 1.0);
    }
    else
    {
        _6579 = _6577;
        _6578 = _6576;
    }
    float3 _6580;
    float3 _6581;
    if (_2762 > 0.5)
    {
        float _4952 = fast::max(0.0, dot(in.v_nDirWS, _2776));
        float3 _4988 = fast::normalize(_2776 + _6489);
        float _4993 = fast::max(0.0, dot(in.v_nDirWS, _4988));
        float _5047 = fma(fma(_4993, _2447, -_4993), _4993, 1.0);
        float _5060 = 1.0 - fast::max(0.0, dot(_6489, _4988));
        float _5074 = _5060 * _5060;
        _6581 = _6579 + (((((((((_2367 + ((float3(1.0) - _2367) * ((_5074 * _5074) * _5060))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_5047, _5047, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _4952) * buffer.u_PointLightsColor[1].xyz) * _2788) * _2808) * 1.0);
        _6580 = _6578 + (((((_2360 * buffer.u_PointLightsColor[1].xyz) * _2788) * _2808) * _4952) * 1.0);
    }
    else
    {
        _6581 = _6579;
        _6580 = _6578;
    }
    float3 _6582;
    float3 _6583;
    if (_2854 > 0.5)
    {
        float _5089 = fast::max(0.0, dot(in.v_nDirWS, _2868));
        float3 _5125 = fast::normalize(_2868 + _6489);
        float _5130 = fast::max(0.0, dot(in.v_nDirWS, _5125));
        float _5184 = fma(fma(_5130, _2447, -_5130), _5130, 1.0);
        float _5197 = 1.0 - fast::max(0.0, dot(_6489, _5125));
        float _5211 = _5197 * _5197;
        _6583 = _6581 + (((((((((_2367 + ((float3(1.0) - _2367) * ((_5211 * _5211) * _5197))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_5184, _5184, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _5089) * buffer.u_SpotLightsColor[0].xyz) * _2880) * _2921) * 1.0);
        _6582 = _6580 + (((((_2360 * buffer.u_SpotLightsColor[0].xyz) * _2880) * _2921) * _5089) * 1.0);
    }
    else
    {
        _6583 = _6581;
        _6582 = _6580;
    }
    float3 _6584;
    float3 _6585;
    if (_2967 > 0.5)
    {
        float _5226 = fast::max(0.0, dot(in.v_nDirWS, _2981));
        float3 _5262 = fast::normalize(_2981 + _6489);
        float _5267 = fast::max(0.0, dot(in.v_nDirWS, _5262));
        float _5321 = fma(fma(_5267, _2447, -_5267), _5267, 1.0);
        float _5334 = 1.0 - fast::max(0.0, dot(_6489, _5262));
        float _5348 = _5334 * _5334;
        _6585 = _6583 + (((((((((_2367 + ((float3(1.0) - _2367) * ((_5348 * _5348) * _5334))) * 0.25) * ((_2447 * 0.31830990314483642578125) / fma(_5321, _5321, 1.0000000116860974230803549289703e-07))) * 3.1415927410125732421875) * _5226) * buffer.u_SpotLightsColor[1].xyz) * _2993) * _3034) * 1.0);
        _6584 = _6582 + (((((_2360 * buffer.u_SpotLightsColor[1].xyz) * _2993) * _3034) * _5226) * 1.0);
    }
    else
    {
        _6585 = _6583;
        _6584 = _6582;
    }
    float3 _3272 = _6584 + _6585;
    out.glResult = float4(pow(_3272.x, 0.4545449912548065185546875), pow(_3272.y, 0.4545449912548065185546875), pow(_3272.z, 0.4545449912548065185546875), buffer._AlbedoColor.w);
    return out;
}

