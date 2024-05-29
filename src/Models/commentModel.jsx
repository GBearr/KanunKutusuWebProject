import DateFormatter from "./dateFormatter";

class Comment {
  constructor(
    id,
    postId,
    userId,
    profileImageURL,
    content,
    craetedAt,
    formatDate
  ) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.profileImageURL = profileImageURL;
    this.content = content;
    this.craetedAt = craetedAt;
    this.formatDate = formatDate;
  }

  static fromJSON(map) {
    const createdAt = new Date(map.created_at);
    const formatDate = DateFormatter.formatDateDifference(createdAt);
    return new Comment(
      map.id,
      map.post_id,
      map.user_id,
      map.profile_image_url,
      map.content,
      map.created_at,
      formatDate
    );
  }

  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      profileImageURL: this.profileImageURL,
      content: this.content,
      craetedAt: this.craetedAt,
    };
  }
}
export default Comment;
