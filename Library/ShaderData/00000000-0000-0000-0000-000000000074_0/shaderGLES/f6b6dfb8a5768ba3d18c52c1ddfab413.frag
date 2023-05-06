#version 300 es
precision highp float;
precision highp int;

uniform mediump sampler2D u_FBOTexture;

in vec2 screenUV;
layout(location = 0) out vec4 o_FragColor;

void main()
{
    o_FragColor = texture(u_FBOTexture, screenUV);
}

