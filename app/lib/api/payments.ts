export async function getPaymentById(paymentId: string) {
  const response = await $api(`/payments/${paymentId}`)
  return response
}