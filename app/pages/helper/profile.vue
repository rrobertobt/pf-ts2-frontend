<template>
  <div class="">
    <h4 class="text-xl my-2 font-semibold ">Perfil de usuario</h4>
    <div class="space-y-3">
      <p class="text-lg ">
        <span class="font-medium text-muted-color">Nombre:</span> {{ session?.first_name }}
        {{ session?.last_name }}
      </p>
      <p class="text-lg ">
        <span class="font-medium text-muted-color">Email:</span> {{ session?.email }}
      </p>
      <div class="text-lg ">
        <span class="font-medium text-muted-color">Rol:</span>
        <div class="my-3">
          <p class="">
            <span class="font-semibold">{{ session.role.name }}</span> ({{
              session.role.slug
            }})
          </p>
          <p class="ml-4 text-sm ">
            {{ session.role.description }}
          </p>
        </div>
      </div>
    </div>

    <Divider class="my-4" />

    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Cambio de contraseña
    </h4>

    <Form
      class=""
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onPasswordSubmit"
    >
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:lock" />
            </InputIcon>
            <InputText
              fluid
              id="new_password"
              variant="filled"
              name="new_password"
              type="password"
            />
          </IconField>
          <label for="new_password">Nueva contraseña</label>
          <Message
            severity="error"
            size="small"
            variant="simple"
            v-if="$form.new_password?.invalid"
          >
            {{ $form.new_password?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:lock" />
            </InputIcon>
            <InputText
              fluid
              id="new_password_confirmation"
              variant="filled"
              name="new_password_confirmation"
              type="password"
            />
          </IconField>
          <label for="new_password_confirmation">Confirmar contraseña</label>
          <Message
            severity="error"
            size="small"
            variant="simple"
            v-if="$form.new_password_confirmation?.invalid"
          >
            {{ $form.new_password_confirmation?.error.message }}
          </Message>
        </IftaLabel>
      </div>
      <Button
        class="my-4"
        size="small"
        icon="pi pi-check"
        label="Actualizar contraseña"
        type="submit"
      />
    </Form>
  </div>
</template>
<script setup>
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { z } from "zod";
  import { updatePassword } from "~/lib/api/users";

  const toast = useToastService();

  const sessionStore = useSessionStore();
  const { logout } = sessionStore;
  const { session } = storeToRefs(sessionStore);

  const initialValues = ref({
    new_password: "",
    new_password_confirmation: "",
  });
  const resolver = ref(
    zodResolver(
      z.object({
        new_password: z
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .max(20, "La contraseña no puede tener más de 20 caracteres"),
        new_password_confirmation: z
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .max(20, "La contraseña no puede tener más de 20 caracteres"),
      }),
    ),
  );

  const { mutate, asyncStatus } = useMutation({
    mutation: (data) => updatePassword(data),
    onSuccess: () => {
      toast.add({
        severity: "success",
        summary: "Contraseña actualizada",
      });
    },
    onError: (error) => {
      toast.add({
        severity: "error",
        summary: "Error al crear el usuario",
        detail: "Ha ocurrido un error al crear el usuario",
      });
    },
  });

  const onPasswordSubmit = (event) => {
    console.log(event);
    if (event.valid) {
      mutate(event.values);
    }
  };

  definePageMeta({
    layout: "helper",
  });
</script>
<style scoped></style>
