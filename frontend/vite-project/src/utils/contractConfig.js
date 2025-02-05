export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_zkvContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_vkHash",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "SuccessfulProofSubmission",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "merklePath",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "leafCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "verifyIncomeProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasSubmittedValidProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROVING_SYSTEM_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vkHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zkvContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
