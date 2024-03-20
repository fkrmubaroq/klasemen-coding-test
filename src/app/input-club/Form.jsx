"use client";
import { useRef, useState } from "react";
import { insertClub } from "../../action/input-club";
import Button from "../../components/button";
import Card from "../../components/card";
import Error from "../../components/error";
import Form from "../../components/form";
import Input from "../../components/input";
import Label from "../../components/label";
import Spinner from "../../components/spinner";
import Success from "../../components/success";
import { STATUS_MESSAGE } from "../../enum";

const initForm = Object.freeze({
  nama_club: "",
  kota: "",
});
export default function FormInputClub() {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const valid = formRef.current.checkValidity();
    setValidated(true);
    if (!valid) return;

    const insertData = await insertClub(form);
    
    if (insertData.status !== STATUS_MESSAGE.Ok) {
      setError(insertData.message);
      return;
    }
    setForm(initForm);
    setError("");
    setSuccess("Data berhasil ditambahkan");
    setValidated(false);
     setIsLoading(false);
  };

  const onChange = (e) =>
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));

  return (
    <div className="max-w-[1200px] mx-auto">
      {!!error && !success && <Error>{error}</Error>}
      {!!success && !error && <Success>{success}</Success>}
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

          <Button type="submit" className="flex justify-center items-center" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Save"}</Button>
        </Form>
      </Card>
    </div>
  );
}
