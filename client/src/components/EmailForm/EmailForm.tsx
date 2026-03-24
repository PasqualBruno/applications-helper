import { Button, Card, Form, Input, Typography, message } from "antd";
import React, { useState } from "react";
import type { IApplicationDTO } from "../../interfaces/application";
import { ApplicationRepository } from "../../repositories/mailRepository";
import "./EmailForm.css";
const { Title } = Typography;

const EmailForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const values = Form.useWatch([], form);
  const isFormComplete = values?.jobName && values?.recipientEmail;

  const onFinish = async (data: IApplicationDTO) => {
    setLoading(true);
    try {
      await ApplicationRepository.sendEmail(data);
      message.success("E-mail enviado com sucesso!");
      form.resetFields();
    } catch (error) {
      message.error("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="form-card">
      <Title level={4} className="form-title">
        Assistente de aplicações
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Título da vaga "
          name="jobName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Desenvolvedor React" />
        </Form.Item>

        <Form.Item
          label="E-mail de Destino"
          name="recipientEmail"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="recrutador@empresa.com" />
        </Form.Item>

        <Form.Item label="Post do LinkedIn" name="linkPost">
          <Input placeholder="Cole o link do post aqui" />
        </Form.Item>

        <div className="button-group">
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!isFormComplete}
            loading={loading}
            className="btn-submit"
          >
            Enviar Agora
          </Button>

          <Button
            type="link"
            block
            onClick={() => form.resetFields()}
            className="btn-clear"
          >
            Limpar Campos
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EmailForm;
