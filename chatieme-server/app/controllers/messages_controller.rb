class MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token, :only => [:create]

    def create
        message_params = params.permit(:topic, :from_name, :content)
        new_message = Message.new message_params
        if new_message.save
            render json: {error: nil}
        else
            render json: {error: true, error_message: new_message.errors.full_message}
        end
    end

end
