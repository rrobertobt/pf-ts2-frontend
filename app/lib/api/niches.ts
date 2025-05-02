export async function getAllNiches(params: Record<string, any>) {
  const res = await $api('/niches', {
    params
  })

  return res
}

export async function getAllNicheStates() {
  const res = await $api('/niches/states')
  return res  
}

export async function getAllNicheTypes() {
  const res = await $api('/niches/types')
  return res  
}

export async function createNiche(data: Record<string, any>) {
  const res = await $api('/niches', {
    method: 'POST',
    body: data,
  })
  return res
}