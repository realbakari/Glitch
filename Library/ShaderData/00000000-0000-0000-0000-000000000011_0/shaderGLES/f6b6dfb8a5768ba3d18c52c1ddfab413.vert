#version 300 es

uniform mat4 u_MVP;

layout(location = 0) in vec3 attPosition;

void main()
{
    gl_Position = u_MVP * vec4(attPosition, 1.0);
}

