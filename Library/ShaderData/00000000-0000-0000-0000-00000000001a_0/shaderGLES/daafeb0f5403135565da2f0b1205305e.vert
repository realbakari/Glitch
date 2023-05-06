#version 300 es

uniform vec4 _MeshRescale;
uniform vec2 _TextureRescale;
uniform mat4 u_MVP;
uniform mat4 u_TransposeInvModel;

layout(location = 0) in vec3 attPosition;
out vec2 g_vary_uv0;
layout(location = 1) in vec2 attTexcoord0;
out vec3 v_worldPos;
out vec3 v_Normal;
layout(location = 2) in vec3 attNormal;
out vec4 v_sampling_pos;
out vec4 v_background_pos;

void main()
{
    vec4 _45 = mat4(vec4(_MeshRescale.x, 0.0, 0.0, 0.0), vec4(0.0, _MeshRescale.y, 0.0, 0.0), vec4(0.0, 0.0, _MeshRescale.z, 0.0), vec4(0.0, 0.0, 0.0, 1.0)) * vec4(attPosition, 1.0);
    g_vary_uv0 = (attTexcoord0 - vec2(0.5)) * _TextureRescale + vec2(0.5);
    vec4 _75 = u_MVP * _45;
    gl_Position = _75;
    v_worldPos = _45.xyz;
    v_Normal = mat3(u_TransposeInvModel[0].xyz, u_TransposeInvModel[1].xyz, u_TransposeInvModel[2].xyz) * attNormal;
    v_sampling_pos = _75;
    v_background_pos = _75;
}

