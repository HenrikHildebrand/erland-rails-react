class V1::SongsController < V1::BaseController
  before_action :set_v1_song, only: [:show, :update, :destroy]

  # GET /v1/songs
  # GET /v1/songs.json
  def index
    @v1_songs = V1::Song.all
  end

  # GET /v1/songs/1
  # GET /v1/songs/1.json
  def show
  end

  # POST /v1/songs
  # POST /v1/songs.json
  def create
    @v1_song = V1::Song.new(v1_song_params)

    if @v1_song.save
      render :show, status: :created, location: @v1_song
    else
      render json: @v1_song.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/songs/1
  # PATCH/PUT /v1/songs/1.json
  def update
    if @v1_song.update(v1_song_params)
      render :show, status: :ok, location: @v1_song
    else
      render json: @v1_song.errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/songs/1
  # DELETE /v1/songs/1.json
  def destroy
    @v1_song.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_song
      @v1_song = V1::Song.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_song_params
      params.fetch(:v1_song, {})
    end
end
