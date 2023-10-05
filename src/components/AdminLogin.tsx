"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function DefaultForm() {
  return (
    <form className="flex flex-col gap-4  w-full md:w-1/2">
      <h1 className="text-3xl font-bold">login</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="your email" />
        </div>
        <TextInput
          id="email1"
          placeholder="eddah@eddah.com"
          required
          type="email"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="your password" />
        </div>
        <TextInput id="password1" required type="password" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">remember me</Label>
      </div>
      <Button
        type="submit"
        className="bg-accent text-black hover:bg-black hover:text-accent"
      >
        log in
      </Button>
    </form>
  );
}
