import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const fileInput = document.getElementById('fileInput');
    const image = document.getElementById('image');
    const resultImage = document.getElementById('resultImage');
    const cropBtn = document.getElementById('cropBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let cropper;
    let currentImageUrl;

    // Обработчик загрузки файла
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Проверка размера файла (до 300 КБ)
        if (file.size > 300 * 1024) {
            alert('Пожалуйста, выберите изображение меньше 300 КБ');
            return;
        }

        // Освобождаем предыдущий URL, если он есть
        if (currentImageUrl) {
            URL.revokeObjectURL(currentImageUrl);
        }

        // Создаем URL для изображения
        currentImageUrl = URL.createObjectURL(file);

        // Устанавливаем изображение
        image.src = currentImageUrl;

        // Инициализируем Cropper.js после загрузки изображения
        image.onload = () => {
            // Уничтожаем предыдущий экземпляр Cropper, если он есть
            if (cropper) {
                cropper.destroy();
            }

            // Инициализируем Cropper
            cropper = new Cropper(image, {
                aspectRatio: NaN, // Свободное соотношение
                viewMode: 1,
                autoCropArea: 0.8,
                responsive: true,
                guides: true,
                center: true
            });

            // Активируем кнопки
            cropBtn.disabled = false;
            downloadBtn.disabled = true;
        };
    });

    // Обработчик кнопки обрезки
    cropBtn.addEventListener('click', () => {
        if (!cropper) return;

        // Получаем обрезанное изображение в формате canvas
        const canvas = cropper.getCroppedCanvas({
            width: 800,
            height: 600,
            minWidth: 256,
            minHeight: 256,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });

        // Преобразуем canvas в URL изображения
        resultImage.src = canvas.toDataURL('image/jpeg', 0.9);

        // Активируем кнопку скачивания
        downloadBtn.disabled = false;
    });

    // Обработчик кнопки скачивания
    downloadBtn.addEventListener('click', () => {
        if (!resultImage.src) return;

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.download = 'cropped-image.jpg';
        link.href = resultImage.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});