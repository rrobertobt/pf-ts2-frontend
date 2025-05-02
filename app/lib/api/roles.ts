export async function getAllRoles() {
  const res = await $api('/roles')

  return res
}