import { SetStateAction, useState } from 'react';

export default function ReviewPage() {
  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = [
    { id: 1, name: 'Món ăn 1', image: '/image1.jpg' },
    { id: 2, name: 'Món ăn 2', image: '/image2.jpg' },
    { id: 3, name: 'Món ăn 3', image: '/image3.jpg' },
  ];

  const handleReviewClick = (dish: SetStateAction<null>) => {
    setSelectedDish(dish);
  };

  const handleCloseForm = () => {
    setSelectedDish(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="text-center">
            <div className="bg-gray-200 w-24 h-24 mx-auto mb-2"></div>
            <p>{dish.name}</p>
            <button
              onClick={() => handleReviewClick(dish)}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
            >
              Đánh giá
            </button>
          </div>
        ))}
      </div>

      {selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-lg font-semibold mb-4">{selectedDish.name}</h2>
            <form>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  placeholder="Bình luận của bạn"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
