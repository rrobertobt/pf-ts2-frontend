<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <Card class="p-3 w-full md:w-4/12">
      <template #title>
        <h1 class="pb-4 flex items-center justify-center">
          <div class="text-center">
            <Icon name="lucide:church" class="mr-3 size-6" />

            <span class="font-bold block">Cementerio Quetzaltenango</span>
            <span class="font-light block">Iniciar Sesión</span>
          </div>
        </h1>
      </template>
      <template #content>
        <form
          class="space-y-4 mb-4"
          @submit.prevent="login(credentials)"
        >
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-light" for="username"
              >Correo electrónico</label
            >
            <IconField>
              <InputIcon class="pi pi-user" />
              <InputText
                :disabled="loading"
                id="username"
                fluid
                v-model="credentials.email"
              />
            </IconField>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-light" for="password">Contraseña</label>
            <InputGroup>
              <IconField class="!w-full">
                <InputIcon class="pi pi-lock" />
                <InputText
                  :disabled="loading"
                  id="password"
                  :class="{
                    '!font-mono': showPassword,
                  }"
                  class="!w-full !border-r-1 !rounded-tr-none !rounded-br-none"
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                />
              </IconField>
              <Button
                size="small"
                :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                class="!border-l-0"
                severity="secondary"
                :disabled="loading"
                outlined
                @click="showPassword = !showPassword"
              />
            </InputGroup>
          </div>
          <Button
            type="submit"
            class="w-full"
            label="Entrar"
            icon="pi pi-sign-in"
            :disabled="!credentials.email || !credentials.password"
            :loading="loading"
          />
        </form>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { useSessionStore } from '~/stores/session';

  const sessionStore = useSessionStore();
  const { login } = sessionStore;
  const { loading } = storeToRefs(sessionStore);

  const credentials = ref({
    email: "",
    password: "",
  });
  const showPassword = ref(false);
</script>
