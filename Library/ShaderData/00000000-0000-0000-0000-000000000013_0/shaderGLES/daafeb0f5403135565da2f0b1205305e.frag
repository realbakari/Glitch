#version 300 es
precision highp float;
precision highp int;

uniform mediump sampler2D _FacePaintTexture;
uniform vec4 _TintColor;
uniform float u_Opacity;

in vec2 g_vary_uv0;
layout(location = 0) out vec4 glResult;

void main()
{
    vec2 _76 = g_vary_uv0;
    _76.y = 1.0 - g_vary_uv0.y;
    vec4 _49 = texture(_FacePaintTexture, _76) * _TintColor;
    float _55 = _49.w * u_Opacity;
    vec4 _79 = _49;
    _79.w = _55;
    if (_55 == 0.0)
    {
        discard;
    }
    glResult = _79;
}

