# Custom Family Feud

Build custom Family Feud games.

## Directions

1. Fork this repo.
1. Copy from `template.json`.
1. Follow this format for your file name: `<name><yyyy><mm><dd>.json`. Example: `dickson20210919.json`.
1. Fill in your clues and answers.
1. Create a pull request. Your commits should automatically trigger a run of
   my validation script.

## Schema

The schema is:

```
{
  surveys: Array<Survey>;
}
```

```
interface Survey {
  // Whether this round is single, double, or triple points. The value must be 1, 2, or 3.
  multiple: number;
  // Question
  question: string;
  // The survey responses. The values must not exceed 100.
  responses: Array<Response>;
}
```

```
interface SurveyResponse {
  // This string must be in all caps.
  response: string;
  value: number;
}
```
