class LocalizationController < ApplicationController

  def index
    if session[:user].nil? 
      redirect_to :controller=>'login', :action=> 'index'
      return
    end

    @languages = Language.all
    render "index"
  end

  def phraseKeys
    if session[:user].nil? 
      render :nothing => true
      return
    end

    render :json => PhraseKey.find(:all, :select => "id, name")
  end

  def phrases
    if session[:user].nil?
      render :nothing => true
      return
    end

    render :json => Phrase.find(:all, 
      :conditions => ["language_id = ?", params[:language_id]], 
      :select => "id, phrase_key_id, content")
  end

  def phraseDetails
    if session[:user].nil?
      render :nothing => true
      return
    end

    phrase = Phrase.find(:first, :conditions => ["language_id = ? AND phrase_key_id = ?", params[:languageId], params[:keyId]]);
    phraseKey = PhraseKey.find(params[:keyId])

    render :json => {
      :key => phraseKey.name,
      :maxLength => phraseKey.maxLength,
      :content => phrase.nil? ? "" : phrase.content
    }

  end

  def phraseKeyDetails
    if session[:user].nil?
      render :nothing => true
      return
    end

    phraseKey = PhraseKey.find(params[:keyId])
    render :json => {
      :name => phraseKey.name,
      :maxLength => phraseKey.maxLength
    }    

  end

  def savePhrase
    if session[:user].nil?
      render :nothing => true
      return
    end

    phrase = Phrase.where(:language_id => params[:languageId], :phrase_key_id => params[:keyId]).first

    if(phrase.nil?)
      phrase = Phrase.new
    end

    phrase.phrase_key = PhraseKey.find(params[:keyId])
    phrase.language = Language.find(params[:languageId])
    phrase.content = params[:content]
    phrase.save

    render :json => phrase
  end

  def savePhraseKey
    if session[:user].nil?
      render :nothing => true
      return
    end

    screenshot = nil

    if params[:screenshot].nil? == false 
      puts(params[:screenshot].tempfile.path)
      screenshot = Screenshot.create({ 
        :binary => IO.read(params[:screenshot].tempfile.path),
        :contentType => params[:screenshot].content_type
      })
    end

    phraseKey = params[:keyId].empty? ? PhraseKey.new : PhraseKey.find(params[:keyId])
    phraseKey.name = params[:name]
    phraseKey.maxLength = params[:maxLength]
    if screenshot.nil? == false
      phraseKey.screenshot = screenshot
    end

    phraseKey.save

    render :text => "success"
  end

  def deletePhraseKey 
    if session[:user].nil?
      render :nothing => true
      return
    end

    keyId = params[:keyId]
    phraseKey = PhraseKey.find(keyId)
    if(phraseKey.screenshot.nil? == false)
      phraseKey.screenshot.delete
    end
    phraseKey.phrases.delete_all
    phraseKey.delete

    render :text => "success"
  end

  def imageForPhraseKey
    if session[:user].nil?
      render :nothing => true
      return
    end

    phraseKey = PhraseKey.find(params[:id])
    screenshot = phraseKey.screenshot
    if screenshot.nil? == false
      send_data(screenshot.binary, :type => screenshot.contentType, :disposition => 'inline')
    else
      render :nothing => true
    end
  end
end