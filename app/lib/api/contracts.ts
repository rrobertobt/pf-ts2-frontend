export async function getAllContracts(params: Record<string, any>) {
  const response = await $api("/contracts", {
    params,
  });
  return response;
}

export async function getAllContractStates() {
  const response = await $api("/contracts/states");
  return response;
}

export async function getContractById(id: string) {
  const response = await $api(`/contracts/${id}`);
  return response;
}

export async function updateContract(id: string, data: Record<string, any>) {
  const response = await $api(`/contracts/${id}`, {
    body: data,
    method: "PUT",
  });
  return response;
}

export async function createPayment(contractId: number) {
  console.log("createPayment", contractId);
  const response = await $api("/payments", {
    body: {
      contract_id: +contractId,
    },
    method: "POST",
  });
  return response;
}