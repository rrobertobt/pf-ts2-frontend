<template>
  <div class="!w-full">
    <h4
      class="text-xl my-2 font-semibold text-muted-color-emphasis flex items-center"
    >
      <Icon name="lucide:plus-square" class="mr-2" />
      Registrar nicho
    </h4>
    <Button
      class="my-4"
      size="small"
      :as="NuxtLink"
      to="/admin/niches"
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
              <Icon name="lucide:hash" />
            </InputIcon>
            <InputText fluid id="code" variant="filled" name="code" />
          </IconField>
          <label for="code">Codigo identificador (único)</label>
          <Message
            v-if="$form.code?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.code?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:map-pin" />
            </InputIcon>
            <InputText
              fluid
              id="avenue_location"
              variant="filled"
              name="avenue_location"
            />
          </IconField>
          <label for="avenue_location">Avenida ubicación</label>
          <Message
            v-if="$form.avenue_location?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.avenue_location?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:map-pin" />
            </InputIcon>
            <InputText
              fluid
              id="street_location"
              variant="filled"
              name="street_location"
            />
          </IconField>
          <label for="street_location">Calle ubicación</label>
          <Message
            v-if="$form.street_location?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.street_location?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel class="w-full" variant="in">
          <Select
            checkmark
            name="type_id"
            inputId="type"
            :options="nicheTypes"
            option-label="name"
            option-value="id"
            placeholder="Seleccione un tipo"
            :loading="nicheTypesLoading"
            fluid
            variant="filled"
          />
          <label for="type">Tipo del nicho</label>
          <Message
            v-if="$form.type_id?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.type_id?.error.message }}
          </Message>
        </IftaLabel>

        <div class="flex items-center gap-2 select-none">
          <Checkbox
            inputId="is_historical"
            name="is_historical"
            binary
            size="large"
          />
          <label for="is_historical">Pertenece a persona histórica</label>
        </div>
      </div>

      <Button class="mt-4" type="submit" :loading="asyncStatus === 'loading'">
        <Icon name="lucide:save" />
        Guardar usuario
      </Button>
    </Form>
  </div>
</template>
<script setup>
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { z } from "zod";
  import { NuxtLink } from "#components";
  import { createUser } from "~/lib/api/users";
  import { createNiche, getAllNicheTypes } from "~/lib/api/niches";
  const toast = useToastService();

  const { data: nicheTypes, loading: nicheTypesLoading } = await useAsyncData(
    () => getAllNicheTypes(),
    {
      lazy: true,
    },
  );

  const initialValues = ref({
    code: "",
    avenue_location: "",
    street_location: "",
    type_id: undefined,
    is_historical: false,
  });
  const resolver = ref(
    zodResolver(
      z.object({
        code: z.string().min(1, "El código es requerido"),
        avenue_location: z.string().min(1, "La avenida es requerida"),
        street_location: z.string().min(1, "La calle es requerida"),
        type_id: z.number({ message: "El tipo es requerido" }),
        is_historical: z.boolean(),
      }),
    ),
  );

  const { mutate, asyncStatus } = useMutation({
    mutation: (data) => createNiche(data),
    onSuccess: () => {
      toast.add({
        severity: "success",
        summary: "Nicho creado",
        detail: "El nicho ha sido registrado exitosamente",
      });
      navigateTo("/admin/niches");
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
          summary: "Error al crear el nicho",
          detail: joinedMessages,
        });
        return;
      }
      toast.add({
        severity: "error",
        summary: "Error al crear el nicho",
        detail: "Ha ocurrido un error al crear el nicho",
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
