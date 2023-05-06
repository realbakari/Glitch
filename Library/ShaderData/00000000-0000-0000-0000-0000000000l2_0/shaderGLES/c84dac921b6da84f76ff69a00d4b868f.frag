#version 300 es
precision highp float;
precision highp int;

uniform mediump sampler2D u_FBOTexture;
uniform float radius;

in vec2 screenUV;
in vec2 orgUV;
in vec2 modelScale;
layout(location = 0) out vec4 o_FragColor;

void main()
{
    mediump vec4 _19 = texture(u_FBOTexture, screenUV);
    vec2 _28 = normalize(orgUV) * radius;
    float _39 = _28.x * modelScale.x;
    float _45 = _28.y * modelScale.y;
    vec2 _46 = vec2(_39, _45);
    float _52 = orgUV.x * modelScale.x;
    float _57 = orgUV.y * modelScale.y;
    vec2 _58 = vec2(_52, _57);
    mediump float _139;
    if (_45 != 0.0)
    {
        _139 = length(cross(normalize(vec3(1.0, (((-1.0) * pow(modelScale.y, 2.0)) * _39) / (pow(modelScale.x, 2.0) * _45), 0.0)), normalize(vec3(_52, _57, 0.0))));
    }
    else
    {
        _139 = 1.0;
    }
    mediump vec4 _141;
    if ((length(_46) - length(_58)) >= 0.0)
    {
        bvec4 _145 = bvec4((length(_58 - _46) * _139) <= 0.20000000298023223876953125);
        _141 = vec4(_145.x ? vec4(0.2980000078678131103515625, 0.5759999752044677734375, 0.913999974727630615234375, 0.5).x : _19.x, _145.y ? vec4(0.2980000078678131103515625, 0.5759999752044677734375, 0.913999974727630615234375, 0.5).y : _19.y, _145.z ? vec4(0.2980000078678131103515625, 0.5759999752044677734375, 0.913999974727630615234375, 0.5).z : _19.z, _145.w ? vec4(0.2980000078678131103515625, 0.5759999752044677734375, 0.913999974727630615234375, 0.5).w : _19.w);
    }
    else
    {
        _141 = _19;
    }
    o_FragColor = _141;
}

