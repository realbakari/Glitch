#version 300 es
precision highp float;
precision highp int;

uniform mediump sampler2D u_FBOTexture;
uniform mediump sampler2D _BaseTexture;
uniform float _Intensity;

in vec2 uv0;
layout(location = 0) out vec4 o_FragColor;

void main()
{
    mediump vec4 _19 = texture(u_FBOTexture, uv0);
    float _31 = floor(_19.z * 63.0);
    float _34 = floor(_31 * 0.125);
    o_FragColor = mix(_19, texture(_BaseTexture, vec2(0.123046875 * _19.x + (((-_34) * 8.0 + _31) * 0.125 + 0.0009765625), 0.123046875 * _19.y + (_34 * 0.125 + 0.0009765625))), vec4(_Intensity));
}

