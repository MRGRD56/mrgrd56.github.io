const scopedEval = (expression: string, context: object) => {
    const evaluator = Function.apply(null, [
        ...Object.keys(context),
        'expression',
        "return eval('expression = undefined;' + expression)"
    ]);
    return evaluator.apply(null, [...Object.values(context), expression]);
};

export default scopedEval;
