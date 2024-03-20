"use client";
import { useRef, useState } from "react";
import { AddClub } from "../../action/input-club";
import Button from "../../components/button";
import Card from "../../components/card";
import Form from "../../components/form";
import Input from "../../components/input";
import Label from "../../components/label";

const initForm = Object.freeze({
  nama_club: "",
  kota: "",
});
export default function FormInputClub() {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(initForm);
  const onSubmit = async () => {
    const valid = formRef.current.checkValidity();
    setValidated(true);
    if (!valid) return;

    console.log("form ", form);
    const insertData = await AddClub(form);
  };

  const onChange = (e) =>
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));

  return (
    <Card className="max-w-[400px] mx-auto mt-10 shadow-sm">
      <Form
        validated={validated}
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-y-4"
      >
        <div className="flex flex-col gap-y-1">
          <Label>Nama Klub</Label>
          <Input
            name="nama_club"
            required
            placeholder="Masukan Nama Club"
            onChange={onChange}
            value={form.nama_club}
            invalid="Nama Club harus diisi"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Kota Klub</Label>
          <Input
            name="kota"
            required
            placeholder="Masukan Kota"
            onChange={onChange}
            value={form.kota}
            invalid="Kota harus diisi"
          />
        </div>

        <Button type="submit" >Save</Button>
      </Form>
    </Card>
  );
}
