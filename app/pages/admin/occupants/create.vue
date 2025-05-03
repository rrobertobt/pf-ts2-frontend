<template>
  <div class="!w-full">
    <h4
      class="text-xl my-2 font-semibold text-muted-color-emphasis flex items-center"
    >
      <Icon name="lucide:plus-square" class="mr-2" />
      Registrar ocupante
    </h4>
    <Button
      class="my-4"
      size="small"
      :as="NuxtLink"
      to="/admin/occupants"
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
      <fieldset
        class="grid gap-4 grid-cols-1 md:grid-cols-3"
        :disabled="asyncStatus === 'loading'"
      >
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
              <Icon name="lucide:calendar" />
            </InputIcon>
            <DatePicker
              fluid
              inputId="date_of_birth"
              name="date_of_birth"
              variant="filled"
            />
          </IconField>
          <label for="date_of_birth">Fecha de nacimiento</label>
          <Message
            v-if="$form.date_of_birth?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.date_of_birth?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:calendar" />
            </InputIcon>
            <DatePicker
              inputId="death_date"
              fluid
              name="death_date"
              variant="filled"
            />
          </IconField>
          <label for="death_date">Fecha de fallecimiento</label>
          <Message
            v-if="$form.death_date?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.death_date?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:map" />
            </InputIcon>
            <InputText
              fluid
              id="birth_location"
              variant="filled"
              name="birth_location"
            />
          </IconField>
          <label for="birth_location">Lugar de nacimiento</label>
          <Message
            v-if="$form.birth_location?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.birth_location?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <InputIcon>
              <Icon name="lucide:map-pin-x" />
            </InputIcon>
            <InputText
              fluid
              id="death_location"
              variant="filled"
              name="death_location"
            />
          </IconField>
          <label for="death_location">Lugar de fallecimiento</label>
          <Message
            v-if="$form.death_location?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.death_location?.error.message }}
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

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <Textarea
              class="resize-none"
              fluid
              variant="filled"
              name="death_cause"
              id="death_cause"
              rows="3"
            />
          </IconField>
          <label for="death_cause">Causa de fallecimiento</label>
          <Message
            v-if="$form.death_cause?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.death_cause?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel variant="in" class="w-full">
          <IconField>
            <Textarea
              class="resize-none"
              fluid
              variant="filled"
              name="observations"
              id="observations"
              rows="3"
            />
          </IconField>
          <label for="observations">Observaciones</label>
          <Message
            v-if="$form.observations?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.observations?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel class="w-full" variant="in">
          <Select
            checkmark
            name="gender_id"
            inputId="type"
            :options="genders"
            option-label="name"
            option-value="id"
            :disabled="asyncStatus === 'loading'"
            placeholder="Seleccione un género"
            :loading="gendersLoading"
            fluid
            variant="filled"
          />
          <label for="type">Género</label>
          <Message
            v-if="$form.gender_id?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.gender_id?.error.message }}
          </Message>
        </IftaLabel>

        <IftaLabel class="w-full" variant="in">
          <AutoComplete
            v-model="selectedNiche"
            option-label="code"
            variant="filled"
            fluid
            input-id="current_niche_id"
            force-selection
            :suggestions="availableNiches?.data"
            placeholder="Escribe el código del nicho"
            :loading="availableNichesLoading"
            @complete="(e) => (nicheSearch = e.query)"
          >
            <template #option="slotProps">
              <strong>{{ slotProps.option.code }}</strong>
              &nbsp;en:&nbsp;
              <span>{{ slotProps.option.avenue_location }}</span>
              &nbsp; <span>{{ slotProps.option.street_location }}</span>
              &nbsp;
              <span v-if="slotProps.option.is_historical">Histórico</span>
            </template>
          </AutoComplete>
          <label for="current_niche_id">Nicho a asignar</label>
        </IftaLabel>
      </fieldset>

      <Button class="mt-4" type="submit" :loading="asyncStatus === 'loading'">
        <Icon name="lucide:save" />
        Guardar usuario
      </Button>

    </Form>
  </div>
</template>
<script setup>
  import { NuxtLink } from "#components";
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { z } from "zod";
  import { getAllGenders } from "~/lib/api/genders";
  import { createNiche, getAllNiches } from "~/lib/api/niches";
  import { createOccupant } from "~/lib/api/occupants";
  const toast = useToastService();

  const nicheSearch = ref("");
  const selectedNiche = ref(null);
  const { data: availableNiches, loading: availableNichesLoading } =
    await useAsyncData(
      () =>
        getAllNiches({
          available: true,
          code: nicheSearch.value || undefined,
        }),
      {
        lazy: true,
        watch: [nicheSearch],
      },
    );

  const { data: genders, loading: gendersLoading } = await useAsyncData(
    () => getAllGenders(),
    {
      lazy: true,
    },
  );

  const initialValues = ref({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    birth_location: "",
    death_location: "",
    dpi: "",
    death_date: "",
    death_cause: "",
    observations: "",
    gender_id: null,
  });
  const resolver = ref(
    zodResolver(
      z
        .object({
          first_name: z.string().min(1, "El nombre es requerido"),
          last_name: z.string().min(1, "El apellido es requerido"),
          date_of_birth: z.date({
            message: "La fecha de nacimiento es requerida",
          }),
          birth_location: z.string().nullable(),
          dpi: z.string(),
          death_date: z.date({
            message: "La fecha de fallecimiento es requerida",
          }),
          death_location: z.string().nullable(),
          death_cause: z.string().optional(),
          observations: z.string().optional(),
          gender_id: z.number({ message: "El género es requerido" }),
        })
        .refine(
          (data) => {
            if (data.death_date && data.date_of_birth) {
              return data.death_date >= data.date_of_birth;
            }
            return true; // If death_date is not provided, the validation passes
          },
          {
            message:
              "La fecha de fallecimiento no puede ser anterior a la fecha de nacimiento",
            path: ["death_date"], // Specify the field to attach the error to
          },
        )
        .refine(
          (data) => {
            if (data.date_of_birth && data.death_date) {
              return data.date_of_birth <= data.death_date;
            }
            return true; // If death_date is not provided, the validation passes
          },
          {
            message:
              "La fecha de nacimiento no puede ser posterior a la fecha de fallecimiento",
            path: ["date_of_birth"], // Specify the field to attach the error to
          },
        ),
    ),
  );

  const { mutate, asyncStatus } = useMutation({
    mutation: (data) => createOccupant(data),
    onSuccess: () => {
      toast.add({
        severity: "success",
        summary: "Ocupante creado",
        detail: "El ocupante ha sido registrado exitosamente",
      });
      navigateTo("/admin/occupants");
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
          summary: "Error al crear el ocupante",
          detail: joinedMessages,
        });
        return;
      }
      toast.add({
        severity: "error",
        summary: "Error al crear el ocupante",
        detail: "Ha ocurrido un error al crear el ocupante",
      });
    },
  });

  const onFormSubmit = (event) => {
    if (event.valid) {
      console.log({
        ...event.values,
        current_niche_id: selectedNiche.value?.id,
      })
      mutate({
        ...event.values,
        current_niche_id: selectedNiche.value?.id,
      });
    }
  };

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
