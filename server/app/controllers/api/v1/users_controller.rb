class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    puts "Received parameters: #{params.inspect}"
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: 201
    else
      render json: {
        error: 'Error creating user ...'
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
