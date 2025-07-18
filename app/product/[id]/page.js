"use client"
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw,  } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getProducts, getProduct, getComments , addComment   } from '@/lib/api';
 import { getToken, addToCart } from '@/lib/storage'; // Uncomment if you have user authentication
import { showNotification } from '@/components/NotificationSystem';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');

      try {
        // Fetch product data
        const productResponse = await getProduct(params.id);
        setProduct(productResponse.data);

        // Fetch related products
        const productsResponse = await getProducts();
        const allProducts = productsResponse.data;
        const filteredProducts = allProducts
          .filter(p => p._id !== productResponse.data._id)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);

        // Fetch comments
        try {
          const commentsResponse = await getComments(params.id);
          console.log('Comments response:', commentsResponse);
          
          // Handle different possible response structures
          let commentsData = [];
          if (commentsResponse && commentsResponse.data) {
            if (Array.isArray(commentsResponse.data)) {
              // If data is directly an array
              commentsData = commentsResponse.data;
            } else if (commentsResponse.data.comments && Array.isArray(commentsResponse.data.comments)) {
              // If data has a comments property
              commentsData = commentsResponse.data.comments;
            } else if (commentsResponse.data.data && Array.isArray(commentsResponse.data.data)) {
              // If data has a nested data property
              commentsData = commentsResponse.data.data;
            }
          }
          
          setComments(commentsData);
          console.log('Processed comments:', commentsData);
        } catch (commentsError) {
          console.error('Error fetching comments:', commentsError);
          setComments([]); // Set empty array if comments fail to load
        }

      } catch (err) {
        setError('Failed to load product data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const token = getToken();
    if (!token) {
      alert('Please login to leave a review');
      return;
    }
    
    if (!newComment.trim() || rating === 0) {
      alert('Please provide both a comment and rating');
      return;
    }

    setSubmittingComment(true);
    try {
      // Call the real API to submit the comment
      const commentData = {
        comment: newComment,
        rating: rating
      };
      
      const response = await addComment(params.id, commentData, token);
      console.log('Comment submitted successfully:', response);
      
      // Add the new comment to the list
      const newCommentObj = {
        _id: response.data._id || Date.now().toString(),
        user: response.data.user || {
          name: 'You',
          email: 'user@example.com'
        },
        comment: newComment,
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      };

      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setRating(0);
      alert('Comment submitted successfully!');
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      addToCart(product);
      showNotification({
        title: 'Added to Cart',
        description: `${product.title} has been added to your cart!`,
        variant: 'default',
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        description: 'Failed to add to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a9e9f] mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link 
              href="/"
              className="px-6 py-3 bg-[#7a9e9f] text-white rounded-lg font-semibold hover:bg-[#6a8e8f] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Create images array from product data
  const productImages = product.imagecover ? [product.imagecover] : [
    'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-800">Products</Link>
            <span>/</span>
            <span className="text-gray-800">Gaming PCs</span>
            <span>/</span>
            <span style={{ color: '#7a9e9f' }}>{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
                <img
                  src={productImages[0]}
                  alt={product.title}
                  className="w-[90%] object-contain rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
                />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    4.5 (156 reviews)
                  </span>
                </div>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold" style={{ color: '#2e2e2e' }}>
                  {product.price} DA
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice} DA
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                    Save {product.originalPrice - product.price} DA
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description || 'Experience ultimate gaming performance with our custom-built gaming PC. Featuring the latest components and cutting-edge technology, this system delivers exceptional performance for gaming and content creation.'}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    {product.quantity} {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{addingToCart ? 'Adding...' : `Add to Cart - ${product.price} DA`}</span>
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg" style={{ color: '#2e2e2e' }}>
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">High-performance gaming components</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">Custom RGB lighting system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">Optimized for 4K gaming</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">Professional build quality</span>
                  </li>
                </ul>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">Orders over 50000 DA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">2 Year Warranty</p>
                    <p className="text-xs text-gray-600">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">30-Day Returns</p>
                    <p className="text-xs text-gray-600">No questions asked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#2e2e2e' }}>
              Complete Your Setup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/product/${relatedProduct._id}`}
                  className="block"
                >
                  <div
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 overflow-hidden group hover:scale-105 h-96 flex flex-col border-2 border-transparent hover:border-[#4E8786] cursor-pointer"
                  >
                    <div className="flex-1 h-[80%] flex items-center justify-center bg-white">
                      <img
                        src={relatedProduct.imagecover || 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'}
                        alt={relatedProduct.title}
                        className="w-[90%] h-[95%] object-contain rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="h-[30%] flex flex-col justify-center items-center px-4">
                      <h3 className="font-semibold text-base mb-1 text-center" style={{ color: '#2e2e2e' }}>
                        {relatedProduct.title}
                      </h3>
                      <span className="text-lg lg:text-lg font-semibold text-center" style={{ color: 'red' }}>
                        {relatedProduct.price} DA
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through text-center">
                          {relatedProduct.originalPrice} DA
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#2e2e2e' }}>
            Customer Reviews ({comments && comments.length > 0 ? comments.length : 0})
          </h2>

          {/* Add Review Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              Write a Review
            </h3>
            
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  Your Review
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a9e9f] focus:border-transparent resize-none transition-colors"
                  rows="4"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={submittingComment}
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#4E8786', color: 'white' }}
              >
                {submittingComment ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          {comments && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id || comment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#7a9e9f] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {typeof comment.user === 'object' ? comment.user.name.charAt(0).toUpperCase() : (comment.user || comment.userName || 'A').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg" style={{ color: '#2e2e2e' }}>
                          {typeof comment.user === 'object' ? comment.user.name : (comment.user || comment.userName || 'Anonymous')}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (comment.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {comment.date || comment.createdAt || 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4 text-base">
                    {comment.comment || comment.text || comment.content || 'No comment text available'}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Verified Purchase
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Comments Message */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share your experience with this product!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}