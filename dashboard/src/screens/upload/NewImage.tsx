import ImageForm from "../../components/Forms/ImageForm";

const NewImage = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Image</h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      <ImageForm />
    </div>
  );
};

export default NewImage;
