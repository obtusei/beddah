const uploadImage = async (
  image: FormDataEntryValue | null,
  folder: string
) => {
  if (image) {
    const newData = new FormData();
    const authString = `eddah:eddah123`;
    const encodedAuthString = btoa(authString);
    newData.append("folder", `eddah/${folder}`);
    newData.append("file", image);
    try {
      const res = await fetch(`${process.env.IMAGE_UPLOAD_URL}`, {
        method: "POST",
        body: newData,
        headers: {
          Authorization: `Basic ${encodedAuthString}`,
        },
      });
      const data = await res.json();
      console.log(data);
      return data.path;
    } catch (err) {
      return null;
    }
  }
};

export default uploadImage;
