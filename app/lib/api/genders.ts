export async function getAllGenders() {
  const response = await $api('/genders')
  return response
}