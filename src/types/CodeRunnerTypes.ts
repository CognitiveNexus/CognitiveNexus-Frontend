export type CNCRResult = {
  success?: string;
  error?: string;
  data?: CNCRData;
  logs: {
    compile: string | false;
    run: string | false;
  };
};

export interface CNCRData {
  steps: CNCRStep[];
  typeDefinitions: CNCRTypeDefinitions;
  endState: 'finished' | 'timeout' | 'overstep' | 'aborted';
}

export interface CNCRStep {
  step: number;
  line: number;
  stdout: string;
  variables: CNCRVar[];
  memory: {
    [address: CNCRMemoryIndex]: {
      value: string;
      rawBytes: string;
    };
  };
}

export type CNCRVarAddress = `0x${string}` | 'NULL' | 'N/A';
export type CNCRVarTypeId = string;
export type CNCRMemoryIndex = `${CNCRVarAddress}:${CNCRVarTypeId}`;

export interface CNCRTypeDefinitions {
  [typeId: CNCRVarTypeId]: CNCRTypeDefinition;
}
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
  targetTypeId: CNCRVarTypeId;
  size: number;
}
export interface CNCRTypeArray {
  base: 'array';
  elementTypeId: CNCRVarTypeId;
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
  fields: {
    [fieldName: string]: {
      typeId: CNCRVarTypeId;
      offset: number;
    };
  };
  size: number;
}

export interface CNCRTypeUnsupported {
  base: 'unsupported';
  size: number;
}
