interface CodeRunnerLogs {
    compile: string | false;
    run: string | false;
}

interface CodeRunnerSuccess {
    status: 'success';
    data: CodeRunnerData;
}

interface CodeRunnerError {
    status: 'error';
    message: string;
}

export type CodeRunnerResult = (CodeRunnerSuccess | CodeRunnerError) & {
    logs: CodeRunnerLogs;
};

export interface CodeRunnerData {
    struct: Record<string, CodeRunnerStruct>;
    steps: CodeRunnerStep[];
    endState: 'finished' | 'timeout' | 'overstep' | 'aborted';
}

export type CodeRunnerStruct = Record<string, number>;

export interface CodeRunnerStep {
    step: number;
    line: number;
    stdout: string;
    variables: Record<string, CodeRunnerVarAddress>;
    memory: Record<CodeRunnerVarAddress, CodeRunnerVar>;
}

export type CodeRunnerVarValue = number | string | CodeRunnerVarAddress; // Maybe More
export type CodeRunnerVarAddress = `0x${string}`;

export interface CodeRunnerVar {
    type: string;
    value: CodeRunnerVarValue;
}
