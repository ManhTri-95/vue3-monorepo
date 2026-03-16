<template>
  <div class="page">
    <div class="header">
      <h2 class="title">Tạo ứng viên</h2>
      <el-button @click="onReset">Làm mới</el-button>
    </div>

    <el-card>
      <el-form ref="formRef" :model="model" :rules="rules" label-width="120px" @submit.prevent>
        <el-form-item label="Họ tên" prop="fullName">
          <el-input v-model="model.fullName" placeholder="Nguyễn Văn A" />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="model.email" placeholder="name@company.com" />
        </el-form-item>

        <el-form-item label="Số điện thoại" prop="phone">
          <el-input v-model="model.phone" placeholder="090..." />
        </el-form-item>

        <el-form-item label="Vị trí" prop="position">
          <el-input v-model="model.position" placeholder="Frontend Developer" />
        </el-form-item>

        <el-form-item label="Ghi chú" prop="note">
          <el-input v-model="model.note" type="textarea" :rows="4" placeholder="Thông tin thêm..." />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="onSubmit">Tạo</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useApplicantsApi } from './composables/use-applicants-api';
import { useApplicantsForm } from './composables/use-applicants-form';

const submitting = ref(false);

const { formRef, model, rules, validate, reset } = useApplicantsForm();
const { createApplicant } = useApplicantsApi();

function onReset() {
  reset();
}

async function onSubmit() {
  if (submitting.value) return;
  const ok = await validate();
  if (!ok) return;

  submitting.value = true;
  try {
    const created = await createApplicant({ ...model });
    ElMessage.success(`Tạo ứng viên thành công (id: ${created.id})`);
    reset();
  } catch (e) {
    ElMessage.error(e instanceof Error ? e.message : 'Tạo ứng viên thất bại');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.page {
  max-width: 900px;
  padding: 16px;
  margin: 0 auto;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.title {
  margin: 0;
}
</style>

