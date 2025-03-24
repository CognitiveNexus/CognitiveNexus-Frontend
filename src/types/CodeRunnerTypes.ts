export type CNCRResult = (CNCRSuccess | CNCRError) & {
    logs: CNCRLogs;
};

interface CNCRSuccess {
    status: 'success';
    data: CNCRData;
}

interface CNCRError {
    status: 'error';
    message: string;
}

interface CNCRLogs {
    compile: string | false;
    run: string | false;
}

export interface CNCRData {
    steps: CNCRStep[];
    typeDefinitions: {
        [typeId: CNCRVarTypeId]: CNCRTypeDefinition;
    };
    endState: 'finished' | 'timeout' | 'overstep' | 'aborted';
}

export interface CNCRStep {
    step: number;
    line: number;
    stdout: string;
    variables: CNCRVar[];
    memory: {
        [address: `${CNCRVarAddress}:${CNCRVarTypeId}`]: {
            value: string;
            rawBytes: string;
        };
    };
}

export type CNCRVarAddress = `0x${string}`;
export type CNCRVarTypeId = string;
export interface CNCRVar {
    name: string;
    typeId: CNCRVarTypeId;
    address: CNCRVarAddress;
}

export type CNCRTypeDefinition = CNCRTypeAtomic | CNCRTypePointer | CNCRTypeArray | CNCRTypeStruct | CNCRTypeUnion | CNCRTypeUnsupported;
export interface CNCRTypeAtomic {
    base: 'atomic';
    size: number;
}
export interface CNCRTypePointer {
    base: 'pointer';
    targetTypeId: CNCRTypeDefinition;
    size: number;
}
export interface CNCRTypeArray {
    base: 'array';
    elementTypeId: CNCRTypeDefinition;
    length: number;
    size: number;
}

export interface CNCRTypeStruct {
    base: 'struct';
    fields: {
        [fieldName: string]: {
            typeId: CNCRVarTypeId;
            offset: number;
        };
    };
    size: number;
}
export interface CNCRTypeUnion {
    base: 'union';
    variants: {
        [variantName: string]: {
            typeId: CNCRVarTypeId;
        };
    };
    size: number;
}

export interface CNCRTypeUnsupported {
    base: 'unsupported';
    size: number;
}
