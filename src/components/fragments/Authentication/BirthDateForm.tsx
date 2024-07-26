import { Controller, useForm } from "react-hook-form";
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const BirthDateSchema = Yup.object({
  day: Yup.string().required("Day is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.string().required("Year is required").min(4, "Year must be 4 digits"),
});

export type IBirthDateForm = Yup.InferType<typeof BirthDateSchema>;

interface BirthDateFormProps {
  onSubmit: (data: IBirthDateForm) => void;
}

export const BirthDateForm = ({ onSubmit }: BirthDateFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBirthDateForm>({
    resolver: yupResolver(BirthDateSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });
  return (
    <FormResetPasswordPinTemplate
      title="Tanggal Lahir"
      message="Masukan tanggal lahir untuk mengonfirmasi identitas Anda."
    >
      <form
        className="w-full flex flex-col justify-center h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-3/4 flex flex-col">
          <Controller
            control={control}
            name="day"
            render={({ field }) => (
              <div className={`${!errors.day && 'mb-4'}`}>
                <label htmlFor="day" className="sr-only">
                  Day of Birth
                </label>
                <input
                  id="day"
                  type="text"
                  {...field}
                  placeholder="DD"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (/^[0-9]*$/.test(value) && value.length <= 2) {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                    errors.day ? "input-error" : "border-[#A09FA4]"
                  }`}
                />
                {errors.day && (
                  <span className="text-red-500">{errors.day.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="month"
            render={({ field }) => (
              <div className={`${!errors.month && 'mb-4'}`}>
                <label htmlFor="month" className="sr-only">
                  Month of Birth
                </label>
                <input
                  id="month"
                  type="text"
                  {...field}
                  placeholder="MM"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (/^[0-9]*$/.test(value) && value.length <= 2) {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                    errors.month ? "input-error" : "border-[#A09FA4]"
                  }`}
                />
                {errors.month && (
                  <span className="text-red-500">{errors.month.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <div className={`${!errors.year && 'mb-4'}`}>
                <label htmlFor="year" className="sr-only">
                  Year of birth
                </label>
                <input
                  id="year"
                  type="text"
                  {...field}
                  placeholder="YYYY"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (/^[0-9]*$/.test(value) && value.length <= 4) {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                    errors.year ? "input-error" : "border-[#A09FA4]"
                  }`}
                />
                {errors.year && (
                  <span className="text-red-500">{errors.year.message}</span>
                )}
              </div>
            )}
          />
        </div>
        <div className="h-1/4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-[10px] h-12 px-16 hover:bg-blue-700 focus:bg-blue-900"
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
