import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { ApplicantCreatePayload } from '../schemas/applicants.schema';

export function useApplicantsForm() {
  const formRef = ref<FormInstance>();

  const model = reactive<ApplicantCreatePayload>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    note: '',
  });

  const rules: FormRules<ApplicantCreatePayload> = {
    fullName: [
      { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
      { min: 2, message: 'Họ tên tối thiểu 2 ký tự', trigger: 'blur' },
    ],
    email: [
      { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
      { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
    ],
    phone: [
      {
        validator: (_rule, value, callback) => {
          if (!value) return callback();
          const normalized = String(value).trim();
          const ok = /^[0-9+()\\-\\s]{8,20}$/.test(normalized);
          callback(ok ? undefined : new Error('Số điện thoại không hợp lệ'));
        },
        trigger: 'blur',
      },
    ],
  };

  async function validate() {
    if (!formRef.value) return false;
    return await formRef.value.validate().catch(() => false);
  }

  function reset() {
    formRef.value?.resetFields();
  }

  return { formRef, model, rules, validate, reset };
}

