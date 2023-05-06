#version 300 es

uniform mat4 u_MVP;
uniform vec2 signFlag;
uniform vec2 intensity;
uniform float radius;
uniform mat4 u_Model;

layout(location = 0) in vec3 attPosition;
out vec2 screenUV;
out vec2 modelScale;
out vec2 orgUV;

void main()
{
    gl_Position = u_MVP * vec4(attPosition, 1.0);
    float _29 = length(attPosition.xy);
    vec2 _38 = sign(signFlag * attPosition.xy);
    vec2 _51 = vec2(1.0 - length(sign(signFlag))) + ((_38 * (_38 + vec2(1.0))) * 0.5);
    vec2 _238;
    if (intensity.x > 0.0)
    {
        vec2 _219 = attPosition.xy;
        _219.x = attPosition.x * (((intensity.x * smoothstep(0.0, 1.0, pow(_29 / radius, 2.0)) + (1.0 - intensity.x)) - 1.0) * _51.x + 1.0);
        _238 = _219;
    }
    else
    {
        vec2 _223 = attPosition.xy;
        _223.x = attPosition.x / ((((-intensity.x) * smoothstep(-0.300000011920928955078125, 1.0, _29 / radius) + (1.0 + intensity.x)) - 1.0) * _51.x + 1.0);
        _238 = _223;
    }
    vec2 _239;
    if (intensity.y > 0.0)
    {
        vec2 _227 = _238;
        _227.y = _238.y * (((intensity.y * smoothstep(0.0, 1.0, pow(_29 / radius, 2.0)) + (1.0 - intensity.y)) - 1.0) * _51.y + 1.0);
        _239 = _227;
    }
    else
    {
        vec2 _231 = _238;
        _231.y = _238.y / ((((-intensity.y) * smoothstep(-0.300000011920928955078125, 1.0, _29 / radius) + (1.0 + intensity.y)) - 1.0) * _51.y + 1.0);
        _239 = _231;
    }
    vec4 _175 = u_MVP * vec4(_239, 0.0, 1.0);
    float _182 = _175.w;
    screenUV = (vec2(_175.x / _182, _175.y / _182) * 0.5) + vec2(0.5);
    modelScale = vec2(length(u_Model[0].xyz), length(u_Model[1].xyz));
    orgUV = attPosition.xy;
}

