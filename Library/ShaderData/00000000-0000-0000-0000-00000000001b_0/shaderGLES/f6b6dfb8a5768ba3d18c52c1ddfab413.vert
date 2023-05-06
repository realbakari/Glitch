#version 300 es

layout(location = 0) in vec3 attPosition;
out vec2 uv0;
layout(location = 1) in vec2 attTexcoord0;

void main()
{
    gl_Position = sign(vec4(attPosition, 1.0));
    uv0 = attTexcoord0;
}

