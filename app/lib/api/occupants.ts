export async function getAllOccupants(params:Record<string, any>) {
  const response = await $api('/occupants', {
    params
  })
  return response
}

export async function createOccupant(data: Record<string, any>) {
  const res = await $api('/occupants', {
    method: 'POST',
    body: data,
  })
  return res
}