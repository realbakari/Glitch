#version 300 es

uniform mat4 u_Model;
uniform mat4 u_TransposeInvModel;
uniform mat4 u_MVP;

layout(location = 1) in vec3 attNormal;
layout(location = 3) in vec3 attTangent;
out vec3 v_posWS;
layout(location = 0) in vec3 attPosition;
out vec3 v_nDirWS;
out vec3 v_tDirWS;
out vec3 v_bDirWS;
out vec2 v_uv0;
layout(location = 2) in vec2 attTexcoord0;
out vec4 v_gl_pos;

void main()
{
    vec4 _30 = vec4(attPosition, 1.0);
    v_posWS = (u_Model * _30).xyz;
    v_nDirWS = normalize((u_TransposeInvModel * vec4(attNormal, 0.0)).xyz);
    v_tDirWS = normalize((u_Model * vec4(attTangent, 0.0)).xyz);
    v_bDirWS = normalize((u_Model * vec4(normalize(cross(attNormal, attTangent)), 0.0)).xyz);
    gl_Position = u_MVP * _30;
    v_uv0 = vec2(attTexcoord0.x, 1.0 - attTexcoord0.y);
    v_gl_pos = gl_Position;
}

