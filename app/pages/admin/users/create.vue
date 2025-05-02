<template>
  <div class="!w-full">
    <h4
      class="text-xl my-2 font-semibold text-muted-color-emphasis flex items-center"
    >
      <Icon name="lucide:plus-square" class="mr-2" />
      Crear Usuario
    </h4>
    <Button
      class="my-4"
      size="small"
      :as="NuxtLink"
      to="/admin/users"
      label="Cancelar"
    >
      <template #icon>
        <Icon name="lucide:arrow-left" />
      </template>
    </Button>
    <Form
      class=""
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
    >
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
        
        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:user" />
            </InputIcon>
            <InputText
              fluid
              id="first_name"
              variant="filled"
              name="first_name"
            />
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
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:user" />
            </InputIcon>
            <InputText fluid id="last_name" variant="filled" name="last_name" />
          </IconField>
          <label for="last_name">Apellidos</label>
          <Message
            v-if="$form.last_name?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.last_name?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:mail" />
            </InputIcon>
            <InputText fluid id="email" variant="filled" name="email" />
          </IconField>
          <label for="email">Correo electrónico</label>
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.email?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:phone" />
            </InputIcon>
            <InputText
              fluid
              id="phone"
              variant="filled"
              name="phone"
              type="tel"
            />
          </IconField>
          <label for="phone">Teléfono</label>
          <Message
            v-if="$form.phone?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.phone?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:house" />
            </InputIcon>
            <InputText
              fluid
              id="address"
              variant="filled"
              name="address"
              type="tel"
            />
          </IconField>
          <label for="address">Dirección</label>
          <Message
            v-if="$form.address?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.address?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:id-card" />
            </InputIcon>
            <InputText fluid id="dpi" variant="filled" name="dpi" type="text" />
          </IconField>
          <label for="dpi">DPI</label>
          <Message
            v-if="$form.dpi?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.dpi?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel class="w-full" variant="in">
          <Select
            name="role_id"
            inputId="role_id"
            :options="roles"
            option-label="name"
            option-value="id"
            fluid
            variant="filled"
          />
          <label for="role_id">Rol a asignar</label>
          <Message
            v-if="$form.role_id?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.role_id?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:lock" />
            </InputIcon>
            <InputText
              fluid
              id="password"
              variant="filled"
              name="password"
              type="password"
            />
          </IconField>
          <label for="password">Contraseña Inicial</label>
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.password?.error.message }}
          </Message>
        </IftaLabel>
      </div>

      <Button class="mt-4" type="submit">
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
  import { createUser } from "~/lib/api/users";
  const toast = useToastService();

  const { data: roles, loading: rolesLoading } = await useAsyncData(() =>
    getAllRoles(),
  );

  const initialValues = ref({
    first_name: "",
    last_name: "",
    email: "",
    dpi: "",
    phone: "",
    password: "",
    role_id: undefined,
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
        address: z.string(),
        password: z
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
        role_id: z.number({ message: "El rol es requerido" }),
      }),
    ),
  );

  const { mutate, asyncStatus } = useMutation({
    mutation: (data) => createUser(data),
    onSuccess: () => {
      toast.add({
        severity: "success",
        summary: "Usuario creado",
        detail: "El usuario ha sido creado exitosamente",
      });
      navigateTo("/admin/users");
    },
    onError: (error) => {
      if (error?.data?.errors && typeof error.data.errors === "object") {
        // Get all arrays of messages
        const allMessagesArrays = Object.values(error.data.errors);
        // Flatten the arrays into a single array of strings
        const flatMessages = allMessagesArrays.flat(); // ['Msg1', 'Msg2', ...]
        // join the messages into a single string
        const joinedMessages = flatMessages.join(", ");
        toast.add({
          severity: "error",
          summary: "Error al crear el usuario",
          detail: joinedMessages,
        });
        return;
      }
      toast.add({
        severity: "error",
        summary: "Error al crear el usuario",
        detail: "Ha ocurrido un error al crear el usuario",
      });
    },
  });

  const onFormSubmit = (event) => {
    if (event.valid) {
      mutate(event.values);
    }
  };

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
