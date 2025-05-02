<template>
  <div class="!w-full">
    <h4
      class="text-xl my-2 font-semibold text-muted-color-emphasis flex items-center"
    >
      <Icon name="lucide:plus-square" class="mr-2" />
      Crear Usuario
    </h4>
    <Button class="my-4" size="small" :as="NuxtLink" to="/admin/users" label="Cancelar">
      <template #icon>
        <Icon name="lucide:arrow-left" />
      </template>
    </Button>
    <Form
      class="grid gap-4 grid-cols-1 md:grid-cols-4"
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
    >
      <FloatLabel variant="in" class="w-full">
        <IconField>
          <InputIcon>
            <Icon name="lucide:user" />
          </InputIcon>
          <InputText fluid id="first_name" variant="filled" name="first_name" />
        </IconField>
        <label for="first_name">Nombres</label>
        <Message
          v-if="$form.first_name?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.first_name?.error.message }}
        </Message>
      </FloatLabel>

     
      <Button class="col-span-1 lg:col-span-2" type="submit">
        <Icon name="lucide:save" />
        Guardar usuario
      </Button>
    </Form>
  </div>
</template>
<script setup>
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { getAllRoles } from "~/lib/api/roles";
  import { z } from "zod";
  import { NuxtLink } from "#components";

  const { data, loading } = await useAsyncData(() => getAllRoles());

  const initialValues = ref({
    first_name: "",
    last_name: "",
    email: "",
    dpi: "",
    phone: "",
    password: "",
    role_id: "",
  });
  const resolver = ref(
    zodResolver(
      z.object({
        first_name: z.string().min(1, "El nombre es requerido"),
        last_name: z.string().min(1, "El apellido es requerido"),
        email: z.string().email("El correo no es válido"),
        dpi: z
          .string()
          .length(13, "El DPI debe tener 13 caracteres")
          .regex(/^[0-9]+$/, "El DPI solo puede contener números"),
        phone: z
          .string()
          .length(8, "El teléfono debe tener 8 caracteres")
          .regex(/^[0-9]+$/, "El teléfono solo puede contener números"),
        password: z
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
        role_id: z.string().min(1, "El rol es requerido"),
      }),
    ),
  );

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
