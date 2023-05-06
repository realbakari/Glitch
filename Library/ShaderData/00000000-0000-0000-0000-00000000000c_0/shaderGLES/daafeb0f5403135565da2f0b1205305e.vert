#version 300 es

uniform mat4 u_Palatte[50];
uniform mat4 u_Model;
uniform mat4 u_TransposeInvModel;
uniform mat4 u_MVP;

layout(location = 1) in vec3 attNormal;
layout(location = 3) in vec3 attTangent;
layout(location = 4) in vec4 attBoneIds;
layout(location = 5) in vec4 attWeights;
layout(location = 0) in vec3 attPosition;
out vec3 v_posWS;
out vec3 v_nDirWS;
out vec3 v_tDirWS;
out vec3 v_bDirWS;
out vec2 v_uv0;
layout(location = 2) in vec2 attTexcoord0;
out vec4 v_gl_pos;

void main()
{
    mat4 _40 = u_Palatte[int(attBoneIds.x)] * attWeights.x;
    mat4 _49 = u_Palatte[int(attBoneIds.y)] * attWeights.y;
    mat4 _71 = u_Palatte[int(attBoneIds.z)] * attWeights.z;
    mat4 _93 = u_Palatte[int(attBoneIds.w)] * attWeights.w;
    mat4 _106 = mat4(((_40[0] + _49[0]) + _71[0]) + _93[0], ((_40[1] + _49[1]) + _71[1]) + _93[1], ((_40[2] + _49[2]) + _71[2]) + _93[2], ((_40[3] + _49[3]) + _71[3]) + _93[3]);
    vec4 _115 = vec4(attPosition, 1.0);
    vec4 _116 = _106 * _115;
    vec4 _126 = _106 * vec4(attNormal, 0.0);
    v_posWS = (u_Model * vec4(_116.xyz, 1.0)).xyz;
    v_nDirWS = normalize((u_TransposeInvModel * vec4(_126.xyz, 0.0)).xyz);
    vec4 _157 = _106 * vec4(attTangent, 0.0);
    vec4 _166 = _106 * vec4(normalize(cross(attNormal, attTangent)), 0.0);
    v_tDirWS = normalize((u_Model * vec4(_157.xyz, 0.0)).xyz);
    v_bDirWS = normalize((u_Model * vec4(_166.xyz, 0.0)).xyz);
    gl_Position = (u_MVP * _106) * _115;
    v_uv0 = vec2(attTexcoord0.x, 1.0 - attTexcoord0.y);
    v_gl_pos = gl_Position;
}

