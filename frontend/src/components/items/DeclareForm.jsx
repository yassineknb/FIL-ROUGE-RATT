import React, { useState, useEffect } from 'react';
import itemsApi from '../../services/itemsApi';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { useNavigate, useParams } from 'react-router-dom';

const CLOUDINARY_CLOUD_NAME = "dn2iellxk";
const CLOUDINARY_UPLOAD_PRESET = "FilRougeRatt";

const DeclareForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '', // 'lost' or 'found'
        date: '',
        place: '', // Maps to 'location' in backend
        image: '', // URL from Cloudinary
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchItem = async () => {
                try {
                    setLoading(true);
                    const res = await itemsApi.getOne(id);
                    if (res.data.success) {
                        const item = res.data.data;
                        setFormData({
                            title: item.title,
                            description: item.description || '',
                            type: item.type,
                            date: item.date,
                            place: item.location,
                            image: item.image || ''
                        });
                    }
                } catch (err) {
                    console.error("Error fetching item", err);
                    setError("Impossible de charger l'objet.");
                } finally {
                    setLoading(false);
                }
            };
            fetchItem();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        data.append('cloud_name', CLOUDINARY_CLOUD_NAME);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: data
            });
            const fileData = await res.json();

            if (fileData.secure_url) {
                setFormData(prev => ({ ...prev, image: fileData.secure_url }));
            } else {
                setError('Erreur lors de l\'upload de l\'image.');
            }
        } catch (err) {
            console.error('Cloudinary Error:', err);
            setError('Impossible d\'uploader l\'image.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description || '');
        data.append('type', formData.type);
        data.append('date', formData.date);
        data.append('location', formData.place);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (id) {
                // For update, we can send JSON directly as image is a string URL
                await itemsApi.update(id, {
                    ...formData,
                    location: formData.place // Backend expects 'location'
                });
                setSuccess(true);
            } else {
                await itemsApi.create(data);
                setSuccess(true);
            }

            setTimeout(() => {
                navigate('/items');
            }, 2000);
        } catch (err) {
            console.error("Error creating item:", err);
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    setError(Object.values(err.response.data.errors).flat().join(' '));
                } else {
                    setError(err.response.data.message || "Une erreur est survenue.");
                }
            } else {
                setError("Impossible de contacter le serveur.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            type: '',
            date: '',
            place: '',
            image: ''
        });
        setError(null);
        setSuccess(false);
    };

    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">{id ? "Modifier l'objet" : "Déclarer un objet"}</h3>

            {error && <Alert message={error} type="error" />}
            {success && <Alert message="Objet déclaré avec succès ! Redirection..." type="success" />}

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Titre <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
                        placeholder="Ex: iPhone noir, carte étudiante, clés..."
                        disabled={loading}
                        required
                    />
                    <p className="mt-1 text-xs text-gray-400">Court et clair (max 255 caractères).</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 resize-none"
                        placeholder="Détails utiles : couleur, marque, état, contenu du sac..."
                        disabled={loading}
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <span>{uploading ? 'Upload en cours...' : 'Choisir une image'}</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={loading || uploading}
                            />
                        </label>
                        {formData.image && (
                            <div className="relative h-12 w-12 rounded overflow-hidden border border-gray-200">
                                <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-gray-400">Ajoutez une photo pour plus de visibilité.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Type */}
                    <div className="w-full">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Type <span className="text-red-500">*</span></label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 appearance-none"
                            disabled={loading}
                            required
                        >
                            <option value="">Choisir...</option>
                            <option value="lost">Perdu</option>
                            <option value="found">Trouvé</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="w-full">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                {/* Place */}
                <div className="mb-8">
                    <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-2">Lieu <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
                        placeholder="Ex: Central Station, Université, Gare..."
                        disabled={loading}
                        required
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button
                        type="submit"
                        isLoading={loading || uploading}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
                    >
                        {id ? "Mettre à jour" : "Enregistrer"}
                    </Button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        Réinitialiser
                    </button>
                </div>

            </form>
        </div>
    );
};

export default DeclareForm;
