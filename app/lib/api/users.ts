export async function getAllUsers(params: Record<string, any>) {
  const res = await $api('/users', {
    params
  })

  return res
}

export async function createUser(data: Record<string, any>) {
  const res = await $api('/users', {
    method: 'POST',
    body: data,
  })
  return res
}

export async function updatePassword(data: Record<string, any>) {
  const res = await $api('/users/password', {
    method: 'PUT',
    body: data,
  })
  return res
}

export async function disableUserById(id: string) {
  const res = await $api(`/users/${id}`, {
    method: 'DELETE',
  })

  return res
}